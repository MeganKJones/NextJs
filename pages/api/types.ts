import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import Constants from '@/app/lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

    try {
        const { name, desc} = req.body;
    
    if (!name || !desc) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    
    const fileContent = await fs.readFile(Constants.typesJsonPath, 'utf8')
    const types = JSON.parse(fileContent)

    const lastType = types[types.length - 1]
    const newId: number = lastType?.id ? lastType.id + 1 : 1

    const newCollection = { id: newId, name, desc };

    types.push(newCollection)
    await fs.writeFile(Constants.typesJsonPath, JSON.stringify(types, null, 2))

    return res.status(200).json({ success: true, type: types })
    
    } catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to save Product type' })
    }
}