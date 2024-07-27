import { NextApiRequest, NextApiResponse } from 'next';
// import { search } from '@/lib/notion/notion';
import NotionService from '@/lib/notion/NotionServer';
import { NOTION_GUIDE_ID } from '@/lib/constants';
import { parsePageId, idToUuid } from 'notion-utils';
import * as Types from '@/lib/type';
import getAllPageIds from '@/lib/notion/getAllPageIds';
import getDataBaseList from '@/lib/notion/getDataBaseList';
import getPage from '@/lib/notion/getPage';
const notionService = new NotionService();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  const pageId: string = parsePageId(req.body.pageId);

  console.log('<<< 获取指定数据库的条目参数', pageId);

  if (!pageId) {
    throw new Error('Invalid notion page id');
  }
  try {
    // const pageData = await notionService.getPageRaw(NOTION_GUIDE_ID);
    const recordMap = await getDataBaseList({
      pageId: NOTION_GUIDE_ID,
      from: 'index',
    });

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, max-age=60, stale-while-revalidate=60',
    );
    res.status(200).json(recordMap);
  } catch (error) {
    console.error('Error searching Notion:', error);
    res.status(500).json({ error: 'Error searching Notion' });
  }
};

export default handler;
