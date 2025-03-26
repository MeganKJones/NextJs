import React from 'react'
import products from "./products.json"
import Link from 'next/link'
import Slug from '../lib/slugify'
import Breadcrumbs from '../components/Breadcrumbs'


const ProductsPage = async () => {
    
  return (
    <>
    <Breadcrumbs current="Products"></Breadcrumbs>
    <div className='flex justify-end'>
    <Link className='btn bg-stone-950 text-stone-50 rounded-xl mb-6 me-5' href="/products/new">Add new product</Link>
    </div>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Product type</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Collection</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.slice().sort((a, b) => a.name.localeCompare(b.name)).map(product =>
          <tr className="bg-base-200">
            <th><Link href={`/products/${Slug.slugify(product.name)}`}><img src={product.image}></img></Link></th>
            <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.name}</Link></td>
            <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.product_type}</Link></td>
            <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.size}</Link></td>
            <td><Link href={`/products/${Slug.slugify(product.name)}`}>£{product.price}</Link></td>
            <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.collection}</Link></td>
          </tr>

          )}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ProductsPage