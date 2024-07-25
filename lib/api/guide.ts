// 获取旅游指南数据库的条目
import NotionService from '@/lib/notion/NotionServer';
import { NOTION_GUIDE_ID, NOTION_COUNTRY_ID } from '@/lib/constants';
import { formatDatabase } from '@/lib/util';
// import { getPage } from '@/lib/notion/notion';
const notionService = new NotionService();

export const getTravelGuideList = async () => {
  const res = await notionService.getDatabase(NOTION_GUIDE_ID);
  console.log('res,', res);
  return formatDatabase(res);
};

export const getCountryList = async () => {
  const res = await notionService.getDatabase(NOTION_COUNTRY_ID);
  console.log('res!!!', res);

  return formatDatabase(res);
};
export const getCollectionData = async (params: any) => {
  // const res = await notionService.getCollectionData({
  //   collectionId: NOTION_GUIDE_ID,
  //   ...params,
  // });
  const res = await notionService.getPage(NOTION_GUIDE_ID);
  return res;
};
