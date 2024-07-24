import { NextApiRequest, NextApiResponse } from 'next';
// import { search } from '@/lib/notion/notion';
import NotionService from '@/lib/notion/NotionServer';
import { NOTION_COUNTRY_ID } from '@/lib/constants';

import * as Types from '@/lib/type';
const notionService = new NotionService();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' });
  }

  const searchParams: Types.SearchParams = req.body;

  console.log('<<< 获取指定数据库的条目参数', searchParams);
  try {
    const pageData = await notionService.getPageRaw(NOTION_COUNTRY_ID);
    const collectionId = Object.entries(
      pageData?.data?.recordMap?.collection,
    )[0][0];
    const collectionView = '9cbfcaa5-ceed-4f65-b289-9d0f3d1c66d1';

    const res = await notionService.getCollectionData({
      collectionId,
    });
    // const response = await notionService.getCollectionData(searchParams);
    console.log('>>> 获取指定数据库的条目结果', pageData);

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
