// 获取旅游指南数据库的条目
import NotionService from '@/lib/notion/NotionServer';
import { NOTION_GUIDE_ID } from '@/lib/constants';
import { formatDatabase } from '@/lib/util';
const notionService = new NotionService();

export const getTravelGuideList = async () => {
  const res = await notionService.getDatabase(NOTION_GUIDE_ID);
  return formatDatabase(res);
};
