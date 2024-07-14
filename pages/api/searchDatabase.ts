/**
 * 搜索数据库内容，by数据库id
 */
import { NOTION_GUIDE_ID } from '@/lib/constants';
import NotionService from '@/lib/notion/NotionServer';
const notionService = new NotionService();
export default async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await notionService.searchNotionByDataBases({
      database_id: NOTION_GUIDE_ID,
      ...query,
    });
    console.log('results', query, results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error searching Notion' });
  }
};
