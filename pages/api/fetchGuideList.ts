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
  debugger;
  // if (!pageId) {
  //   throw new Error('Invalid notion page id');
  // }
  try {
    const pageData = await notionService.getPageRaw(NOTION_GUIDE_ID);
    const recordMap = await notionService.getPage(NOTION_GUIDE_ID);

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
