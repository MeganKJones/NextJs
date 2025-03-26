import path from 'path'

const collectionsJsonPath = path.join(process.cwd(), 'app', '/collections/collections.json')
const productsJsonPath = path.join(process.cwd(), 'app', '/products/products.json')
const typesJsonPath = path.join(process.cwd(), 'app', '/productTypes/types.json')

export default {
    collectionsJsonPath,
    productsJsonPath,
    typesJsonPath
}