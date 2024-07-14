import { searchNotionByTitle } from '@/lib/api/guide';

export default async (req, res) => {
  const { query } = req.query;

  debugger;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await searchNotionByTitle(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error searching Notion' });
  }
};
