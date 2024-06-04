// 获取菜单列表
import NotionService from './NotionServer';
import { NOTION_PUBLIC_MENU } from '../constants';
import { formatDatabase } from '../util';
const notionService = new NotionService();

const getMenuList = async () => {
  const res = await notionService.getDatabase(NOTION_PUBLIC_MENU);
  return formatDatabase(res);
};

export default getMenuList;
