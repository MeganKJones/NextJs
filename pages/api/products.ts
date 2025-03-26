import { IncomingForm } from 'formidable'
import fs from 'fs/promises'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import Slug from '@/app/lib/slugify'
import Constants from '@/app/lib/constants'

// Disable the default body parser — required for formidable
export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadsDir = path.join(process.cwd(), 'public', '')


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

    const name = fields.name?.[0] || ''
    const imageFile = files.image?.[0]

    let imageFileName = ''

    if (imageFile) {
      const fileExt = path.extname(imageFile.originalFilename || '')
      const slug = Slug.slugify(name)
      imageFileName = `${slug}${fileExt}`
      const destPath = path.join(uploadsDir, imageFileName)
      await fs.rename(imageFile.filepath, destPath)
    }

    const newProduct = {
      name: name,
      product_type: fields.product_type?.[0] || '',
      size: fields.size?.[0] || '',
      price: fields.price?.[0] || '',
      collection: fields.collection?.[0] || '',
      image: imageFileName,
    }
    const fileContent = await fs.readFile(Constants.productsJsonPath, 'utf8')
    const products = JSON.parse(fileContent)

    const lastProduct = products[products.length - 1]
    const newId: number = lastProduct?.id ? lastProduct.id + 1 : 1

    const productWithId = { id: newId, ...newProduct }

    try {
      products.push(productWithId)
      await fs.writeFile(Constants.productsJsonPath, JSON.stringify(products, null, 2))

      return res.status(200).json({ success: true, product: newProduct })
    } catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to save product' })
    }
  })
}