import { IncomingForm } from 'formidable'
import fs from 'fs/promises'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

// Disable the default body parser — required for formidable
export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadsDir = path.join(process.cwd(), 'public', '')
const productsJsonPath = path.join(process.cwd(), 'app', '/products/products.json')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const form = new IncomingForm({ uploadDir: uploadsDir, keepExtensions: true })

  // Ensure upload directory exists
  await fs.mkdir(uploadsDir, { recursive: true })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error parsing form data' })
    }

    const newProduct = {
      name: fields.name?.[0] || '',
      product_type: fields.product_type?.[0] || '',
      size: fields.size?.[0] || '',
      price: fields.price?.[0] || '',
      collection: fields.collection?.[0] || '',
      image: files.image?.[0] ? `${path.basename(files.image[0].filepath)}` : '',
    }
    const fileContent = await fs.readFile(productsJsonPath, 'utf8')
    const products = JSON.parse(fileContent)

    const lastProduct = products[products.length - 1]
    const newId: number = lastProduct?.id ? lastProduct.id + 1 : 1

    const productWithId = { id: newId, ...newProduct }

    try {
      products.push(productWithId)
      await fs.writeFile(productsJsonPath, JSON.stringify(products, null, 2))

      return res.status(200).json({ success: true, product: newProduct })
    } catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to save product' })
    }
  })
}