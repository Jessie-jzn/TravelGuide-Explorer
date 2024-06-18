import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('调用 API 时出错:', error);
      res.status(500).json({ error: '调用 API 失败' });
    }
  } else {
    res.status(405).json({ error: '方法不被允许' });
  }
}
