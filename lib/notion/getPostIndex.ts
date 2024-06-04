// import BLOG from '@/blog.config'
import { idToUuid } from 'notion-utils';
import { formatDate } from '../util';
import { getPostBlocks } from './getPostBlocks';
import { defaultMapImageUrl } from 'react-notion-x';
import { NOTION_HOST } from '../constants';

// 定义 PostInfo 类型
interface PostInfo {
  format?: {
    page_cover?: string;
  };
  [key: string]: any; // 允许有其他属性
  properties: {
    title?: [string, ...any[]];
  };
  created_time: string;
  last_edited_time: string;
}

interface Post {
  id: string;
  type: PostInfo | undefined;
  category: string;
  tags: string[];
  title: string | undefined;
  status: string;
  createdTime: string;
  lastEditedDay: string;
  fullWidth: boolean;
  page_cover: string | undefined;
  date: { start_date: string };
  blockMap: any;
}
/**
 * 根据页面ID获取内容
 * @param pageId 页面ID
 * @returns 格式化后的页面信息或 null
 */
export async function getPostIndex(pageId: string): Promise<Post | null> {
  const blockMap = await getPostBlocks(pageId);
  console.log('blockMap', blockMap);

  if (!blockMap) {
    return null;
  }

  const postInfo = blockMap?.block?.[idToUuid(pageId)]?.value as PostInfo;

  console.log('postInfo', postInfo);

  return {
    id: pageId,
    type: postInfo,
    category: '',
    tags: [],
    title: postInfo?.properties?.title?.[0],
    status: 'Published',
    createdTime: formatDate(new Date(postInfo?.created_time).toString()),
    lastEditedDay: formatDate(new Date(postInfo?.last_edited_time).toString()),
    fullWidth: false,
    page_cover: getPageCover(postInfo),
    date: {
      start_date: formatDate(new Date(postInfo?.last_edited_time).toString()),
    },
    blockMap,
  };
}

// /**
//  * 获取页面封面
//  * @param postInfo 页面信息
//  * @returns 页面封面URL
//  */
// function getPageCover(postInfo: PostInfo): string | undefined {
//   const pageCover = postInfo.format?.page_cover
//   if (pageCover) {
//     if (pageCover.startsWith('/')) return NOTION_HOST + pageCover
//     if (pageCover.startsWith('http')) return defaultMapImageUrl(pageCover, postInfo)
//   }
//   return undefined
// }

/**
 * 获取页面封面
 * @param postInfo 页面信息
 * @returns 页面封面URL
 */
function getPageCover(postInfo: PostInfo): string | undefined {
  const pageCover = postInfo?.format?.page_cover;

  if (pageCover) {
    if (pageCover.startsWith('/')) {
      return NOTION_HOST + pageCover;
    }
    if (pageCover.startsWith('http')) {
      return defaultMapImageUrl(pageCover, postInfo);
    }
  }

  return undefined;
}
