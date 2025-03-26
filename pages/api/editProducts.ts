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
  if (req.method !== 'PUT') {
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

    const id = Number(fields.id?.[0])
    if (!id) return res.status(400).json({error: "Missing product ID"})

    try {
      const fileContent = await fs.readFile(Constants.productsJsonPath, 'utf8')
      const products = JSON.parse(fileContent)

      const productIndex = products.findIndex((p: any) => p.id === id)
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' })
    }

    const oldProduct = products[productIndex]
    let newImageName = oldProduct.image

    const imageFile = files.image?.[0]
    const name = fields.name?.[0] || oldProduct.name

    if (imageFile) {
      const ext = path.extname(imageFile.originalFilename || '')
      const slug = Slug.slugify(name)
      newImageName = `${slug}${ext}`
      const destPath = path.join(uploadsDir, newImageName)

      // Rename the uploaded file
      await fs.rename(imageFile.filepath, destPath)
    }

    const updatedProduct = {
      ...oldProduct,
      name: fields.name?.[0] || oldProduct.name,
      product_type: fields.product_type?.[0] || oldProduct.product_type,
      size: fields.size?.[0] || oldProduct.size,
      price: fields.price?.[0] || oldProduct.price,
      collection: fields.collection?.[0] || oldProduct.collection,
      image: imageFile ? newImageName : oldProduct.image
    }

    products[productIndex] = updatedProduct
    await fs.writeFile(Constants.productsJsonPath, JSON.stringify(products, null, 2))

    return res.status(200).json({ success: true, product: updatedProduct })

  }   catch (writeErr) {
      console.error(writeErr)
      return res.status(500).json({ error: 'Failed to update product' })
    }
})
}