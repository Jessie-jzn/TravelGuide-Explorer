import { NextApiRequest, NextApiResponse } from 'next';
// import { search } from '@/lib/notion/notion';
import NotionService from '@/lib/notion/NotionServer';
import { NOTION_GUIDE_ID } from '@/lib/constants';
import { parsePageId } from 'notion-utils';
import * as Types from '@/lib/type';
const notionService = new NotionService();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  const pageId: string = parsePageId(req.body.pageId);

  console.log('<<< 获取指定数据库的条目参数', pageId);
  // debugger;
  // if (!pageId) {
  //   throw new Error('Invalid notion page id');
  // }
  try {
    const pageData = await notionService.getPageRaw(NOTION_GUIDE_ID);
    const recordMap = await getPageWithRetry(NOTION_GUIDE_ID, 'index');

    const collectionId = Object.entries(recordMap?.collection)[0][0];
    const collectionViewId = Object.entries(recordMap?.collection_view)[0][0];
    const response = await notionService.getCollectionData({
      collectionId,
      collectionViewId,
      collectionView: {
        type: 'type',
        searchQuery: 'china',
      },
    });

    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;
    if (!block) {
      throw new Error('Invalid recordMap for page');
    }

    console.log('recordMap', recordMap);
    console.log('block', block);
    console.log('response', collectionId, collectionViewId, response);

    // const collectionId = Object.entries(
    //   pageData?.data?.recordMap?.collection,
    // )[0][0];
    // const collectionView = '9cbfcaa5-ceed-4f65-b289-9d0f3d1c66d1';

    // const res = await notionService.getCollectionData({
    //   collectionId,
    // });
    // // const response = await notionService.getCollectionData(searchParams);
    // console.log('>>> 获取指定数据库的条目结果', pageData);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60',
    );
    res.status(200).json(pageData);
  } catch (error) {
    console.error('Error searching Notion:', error);
    res.status(500).json({ error: 'Error searching Notion' });
  }
};

export default handler;

/**
 * 调用接口，失败时会重试指定次数
 * @param {string} id - 页面ID
 * @param {string} from - 请求来源
 * @param {number} [retryAttempts=3] - 重试次数，默认值为3次
 * @returns {Promise<any | null>} - 返回页面数据或null（重试次数耗尽）
 */
export async function getPageWithRetry(
  id: string,
  from: string,
  retryAttempts = 3,
): Promise<any | null> {
  if (retryAttempts > 0) {
    console.log(
      '[API-->>请求]',
      `from:${from}`,
      `id:${id}`,
      retryAttempts < 3 ? `剩余重试次数:${retryAttempts}` : '',
    );

    try {
      const start = Date.now();
      const pageData = await notionService.getPage(id);
      const end = Date.now();
      console.log('[API<<--响应]', `耗时:${end - start}ms - from:${from}`);
      return pageData;
    } catch (e) {
      console.warn('[API<<--异常]:', e);
      return await getPageWithRetry(id, from, retryAttempts - 1);
    }
  } else {
    console.error('[请求失败]:', `from:${from}`, `id:${id}`);
    return null;
  }
}

// export async function getDataBaseList({ pageId, from }) {
//   console.log('[Fetching Data]', pageId, from);
//   const pageRecordMap = await notionService.getPage(pageId);
//   if (!pageRecordMap) {
//     console.error('can`t get Notion Data ; Which id is: ', pageId);
//     return {};
//   }
//   pageId = idToUuid(pageId);
//   let block = pageRecordMap.block || {};
//   const rawMetadata = block[pageId]?.value;
//   // Check Type Page-Database和Inline-Database
//   if (
//     rawMetadata?.type !== 'collection_view_page' &&
//     rawMetadata?.type !== 'collection_view'
//   ) {
//     console.error(`pageId "${pageId}" is not a database`);
//     return EmptyData(pageId);
//   }
//   const collection = Object.values(pageRecordMap.collection)[0]?.value || {};
//   const collectionId = rawMetadata?.collection_id;
//   const collectionQuery = pageRecordMap.collection_query;
//   const collectionView = pageRecordMap.collection_view;
//   const schema = collection?.schema;

//   const viewIds = rawMetadata?.view_ids;
//   const collectionData = [];
// }
