// import BLOG from '@/blog.config'
import { NotionAPI } from 'notion-client';
// import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { deepClone } from '../util';
import { NOTION_TOKEN } from '../constants';

type PageBlock = any; // 定义页面区块的类型，可以根据需要更改

/**
 * 获取文章内容
 * @param id - 文章ID
 * @param from - 来源
 * @param slice - 可选，截取的区块数量
 * @returns 格式化后的页面区块
 */
export async function getPostBlocks(
  id: string,
  from?: string,
  slice?: number
): Promise<PageBlock> {
  const start = new Date().getTime();
  const pageBlock = await getPageWithRetry(id, from);
  const end = new Date().getTime();
  console.log('[API耗时]', `${end - start}ms`);

  if (pageBlock) {
    return filterPostBlocks(id, pageBlock, slice);
  }

  return pageBlock;
}

/**
 * 调用接口，失败会重试
 * @param id - 文章ID
 * @param from - 来源
 * @param retryAttempts - 可选，重试次数，默认为3
 * @returns 页面数据
 */
export async function getPageWithRetry(
  id: string,
  from?: string,
  retryAttempts = 3
): Promise<PageBlock | null> {
  if (retryAttempts > 0) {
    console.log(
      '[请求API]',
      `from:${from}`,
      `id:${id}`,
      retryAttempts < 3 ? `剩余重试次数:${retryAttempts}` : ''
    );
    try {
      const authToken = NOTION_TOKEN;
      const api = new NotionAPI();
      const pageData = await api.getPage(id);
      console.info('[响应成功]:', `from:${from}`);
      return pageData;
    } catch (e) {
      console.warn('[响应异常]:', e);
      return await getPageWithRetry(id, from, retryAttempts - 1);
    }
  } else {
    console.error('[请求失败]:', `from:${from}`, `id:${id}`);
    return null;
  }
}

/**
 * 获取到的blockMap删除不需要的字段
 * 并且对于页面内容进行特殊处理，比如文件url格式化
 * @param id - 页面ID
 * @param pageBlock - 页面元素
 * @param slice - 可选，截取数量
 * @returns 格式化后的页面区块
 */
function filterPostBlocks(
  id: string,
  pageBlock: PageBlock,
  slice?: number
): PageBlock {
  const clonePageBlock = deepClone(pageBlock);
  let count = 0;

  // 循环遍历文档的每个block
  for (const i in clonePageBlock?.block) {
    const b = clonePageBlock?.block[i];
    if (slice && slice > 0 && count > slice) {
      delete clonePageBlock?.block[i];
      continue;
    }

    // 当BlockId等于PageId时移除
    if (b?.value?.id === id) {
      // 此block含有敏感信息
      delete b?.value?.properties;
      continue;
    }

    count++;

    // 如果是文件，或嵌入式PDF，需要重新加密签名
    if (
      (b?.value?.type === 'file' ||
        b?.value?.type === 'pdf' ||
        b?.value?.type === 'video') &&
      b?.value?.properties?.source?.[0][0]
    ) {
      const oldUrl = b?.value?.properties?.source?.[0][0];
      const newUrl = `https://notion.so/signed/${encodeURIComponent(oldUrl)}?table=block&id=${b?.value?.id}`;
      b.value.properties.source[0][0] = newUrl;
    }

    delete b?.role;
    delete b?.value?.version;
    delete b?.value?.created_by_table;
    delete b?.value?.created_by_id;
    delete b?.value?.last_edited_by_table;
    delete b?.value?.last_edited_by_id;
    delete b?.value?.space_id;
  }

  // 去掉不用的字段
  //   if (id === BLOG.NOTION_PAGE_ID) {
  //     return clonePageBlock
  //   }
  return clonePageBlock;
}
