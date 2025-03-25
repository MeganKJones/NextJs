'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import products from './../products/products.json'
import Link from 'next/link'
import NavBar from '../components/NavBar'

const SearchResults = () => {
  const searchParams = useSearchParams()
  const query = searchParams!.get('query')?.toLowerCase() || ''

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.collection.toLowerCase().includes(query) ||
    product.product_type.toLowerCase().includes(query)
  )

  return (<>
    <NavBar></NavBar>
    <div className="breadcrumbs text-sm ps-4">
      <ul>
        <li><Link href="/"> Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><p>Search results</p></li>
      </ul>
    </div>
    <div className="p-6">
      <h1 className="text-2xl mb-4">Search Results for "{query}"</h1>
      {filteredProducts.length === 0 && <p>No products found.</p>}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Collection</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="bg-base-200">
                <td><img src={product.image} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>{product.product_type}</td>
                <td>{product.size}</td>
                <td>£{product.price}</td>
                <td>{product.collection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default SearchResults