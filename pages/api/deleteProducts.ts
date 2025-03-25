import fs from 'fs/promises'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const productsJsonPath = path.join(process.cwd(), 'app', '/products/products.json')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (req.method === 'DELETE') {
    try {
      const id = Number(req.query.id);
      if (!id) return res.status(400).json({ error: "Missing product ID" });

      console.log("ID: ", id)
  
      const fileContent = await fs.readFile(productsJsonPath, 'utf8');
      const products = JSON.parse(fileContent);
  
      const newProducts = products.filter((p: any) => p.id !== id);
      await fs.writeFile(productsJsonPath, JSON.stringify(newProducts, null, 2));
  
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}