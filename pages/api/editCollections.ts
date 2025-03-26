import fs from 'fs/promises'
import { NextApiRequest, NextApiResponse } from 'next'
import Constants from '@/app/lib/constants'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, desc } = req.body
    const id = Number(req.body.id)

    if (!id) return res.status(400).json({error: "Missing product ID"})

    // write to collections.json
    const collectionsData = await fs.readFile(Constants.collectionsJsonPath, 'utf8')
    const collections = JSON.parse(collectionsData)

    const collectionIndex = collections.findIndex((p: any) => p.id === id)
    if (collectionIndex === -1) {
      return res.status(404).json({ error: 'collection not found' })
    }

      const oldCollection = collections[collectionIndex]
      const oldName = oldCollection.name

      const updatedCollection = {
        ...oldCollection,
        name: name || oldCollection.name,
        desc: desc || oldCollection.desc,
  
      }
  
      collections[collectionIndex] = updatedCollection
      await fs.writeFile(Constants.collectionsJsonPath, JSON.stringify(collections, null, 2))

      // write to products.json
      const productsData = await fs.readFile(Constants.productsJsonPath, 'utf8')
      const products = JSON.parse(productsData)
  
      const updatedProducts = products.map((product: any) =>
        product.collection === oldName
          ? { ...product, collection: updatedCollection.name }
          : product
      )
  
      await fs.writeFile(Constants.productsJsonPath, JSON.stringify(updatedProducts, null, 2))
  
      return res.status(200).json({ success: true, collection: updatedCollection })

  }   catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to update product' })
    }
}