import React from 'react'
import products from "./products.json"
import styles from './Page.module.css'
import NavBar from '../components/NavBar'
import Link from 'next/link'
import slugify from '../lib/slugify'


const ProductsPage = async () => {
    
  return (
    <>
    <NavBar></NavBar>
    <div className="breadcrumbs text-sm ps-4">
      <ul>
        <li><Link href="/"> Home</Link></li>
        <li><p>Products</p></li>
      </ul>
    </div>
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
            <th><Link href={`/products/${slugify(product.name)}`}><img src={product.image}></img></Link></th>
            <td><Link href={`/products/${slugify(product.name)}`}>{product.name}</Link></td>
            <td><Link href={`/products/${slugify(product.name)}`}>{product.product_type}</Link></td>
            <td><Link href={`/products/${slugify(product.name)}`}>{product.size}</Link></td>
            <td><Link href={`/products/${slugify(product.name)}`}>£{product.price}</Link></td>
            <td><Link href={`/products/${slugify(product.name)}`}>{product.collection}</Link></td>
          </tr>

          )}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default ProductsPage