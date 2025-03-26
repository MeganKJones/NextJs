import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import Constants from '@/app/lib/constants'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (req.method === 'DELETE') {
    try {
      const id = Number(req.query.id);
      if (!id) return res.status(400).json({ error: "Missing product ID" });

      console.log("ID: ", id)
  
      const fileContent = await fs.readFile(Constants.collectionsJsonPath, 'utf8');
      const collection = JSON.parse(fileContent);
  
      const newCollection = collection.filter((p: any) => p.id !== id);
      await fs.writeFile(Constants.collectionsJsonPath, JSON.stringify(newCollection, null, 2));
  
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete collection' });
    }
  }
}