'use client'
import React from 'react'
import products from './../../products/products.json'
import types from './../types.json'
import Slug from '@/app/lib/slugify'
import Link from 'next/link'
import Breadcrumbs from '@/app/components/Breadcrumbs'

interface Props {
    params: {
      slug: string
    }
  }

export const ProductTypeView = ({params}: Props) => {
    const { slug } = params

const matchingType = types.find(
    (p) => Slug.slugify(p.name) === slug
  )

const productsOfType = products.filter(
    (p) => p.product_type === matchingType?.name
    )

const deleteType = async () => {

const res = await fetch(`/api/deleteType?id=${matchingType?.id}`, {
  method: "DELETE",

});

if (res.ok) {
  alert("Product type deleted!");
  window.location.href = "/productTypes";
} else {
  alert("Failed to delete product type.");
}
}
    

  return (<>
 <Breadcrumbs current={matchingType?.name} linkOne='Product Types' linkOnePath='/productTypes'></Breadcrumbs>
 <div className='flex justify-end'>
 <button className="btn bg-rose-500 text-stone-950 rounded-xl" onClick={()=>(document.getElementById('deleteModal')as HTMLDialogElement)?.showModal()}>Delete</button>
    <dialog id="deleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">This action cannot be undone. Click </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn bg-stone-50 text-stone-950">Cancel</button>
          </form>
          <button className="btn bg-rose-500 text-stone-950" onClick={(e) => {
            e.preventDefault()
            deleteType()}}>Delete</button>
        </div>
      </div>
    </dialog>
    <Link className='btn bg-stone-950 text-stone-50 rounded-xl mb-6 me-5' href={`/productTypes/${slug}/edit`}>Edit {matchingType?.name ?? Slug.unslugify(slug)}</Link>
    </div>

 <div className="p-6">
      {productsOfType.length === 0 && <p>No products found.</p>}
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
            {productsOfType.map(product => (
              <tr key={product.id} className="bg-base-200">
                <td><img src={`/${product.image}`} alt={product.name} /></td>
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

export default ProductTypeView