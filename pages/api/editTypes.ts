import fs from 'fs/promises'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const typesJsonPath = path.join(process.cwd(), 'app', '/productTypes/types.json')
const productsJsonPath = path.join(process.cwd(), 'app', '/products/products.json')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, desc } = req.body
    const id = Number(req.body.id)

    if (!id) return res.status(400).json({error: "Missing product ID"})

    // write to types.json
    const typesData = await fs.readFile(typesJsonPath, 'utf8')
    const types = JSON.parse(typesData)

    const typeIndex = types.findIndex((p: any) => p.id === id)
    if (typeIndex === -1) {
      return res.status(404).json({ error: 'product type not found' })
    }

      const oldType = types[typeIndex]
      const oldName = oldType.name

      const updatedType = {
        ...oldType,
        name: name || oldType.name,
        desc: desc || oldType.desc,
  
      }
  
      types[typeIndex] = updatedType
      await fs.writeFile(typesJsonPath, JSON.stringify(types, null, 2))

      // write to products.json
      const productsData = await fs.readFile(productsJsonPath, 'utf8')
      const products = JSON.parse(productsData)
  
      const updatedProducts = products.map((product: any) =>
        product.product_type === oldName
          ? { ...product, product_type: updatedType.name }
          : product
      )
  
      await fs.writeFile(productsJsonPath, JSON.stringify(updatedProducts, null, 2))
  
      return res.status(200).json({ success: true, type: updatedType })

  }   catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to update product type' })
    }
}