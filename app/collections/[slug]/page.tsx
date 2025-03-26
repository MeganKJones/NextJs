'use client'
import React from 'react'
import products from './../../products/products.json'
import collections from './../collections.json'
import Slug from '@/app/lib/slugify'
import Link from 'next/link'
import Breadcrumbs from '@/app/components/Breadcrumbs'

interface Props {
    params: {
      slug: string
    }
  }


export const CollectionView = ({params}: Props) => {
    const { slug } = params

    const matchingCollection = collections.find(
        (c) => Slug.slugify(c.name) === slug
      )

    const collectionProducts = products.filter(
        (p) => p.collection === matchingCollection?.name
        )

    const deleteCollection = async () => {

      const res = await fetch(`/api/deleteCollection?id=${matchingCollection?.id}`, {
        method: "DELETE",
  
      });
  
      if (res.ok) {
        alert("Collection deleted!");
        window.location.href = "/collections";
      } else {
        alert("Failed to delete collection.");
      }
    }

  return (<>
 <Breadcrumbs linkOne='Collections' linkOnePath='/collections' current={matchingCollection?.name ?? Slug.unslugify(slug)} ></Breadcrumbs>
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
            deleteCollection()}}>Delete</button>
        </div>
      </div>
    </dialog>
    <Link className='btn bg-stone-950 text-stone-50 rounded-xl mb-6 me-5' href={`/collections/${slug}/edit`}>Edit {matchingCollection?.name ?? Slug.unslugify(slug)}</Link>
  </div>

 <div className="p-6">
      {collectionProducts.length === 0 && <p>No products found.</p>}
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
            {collectionProducts.map(product => (
              <tr key={product.id} className="bg-base-200">
              <td><Link href={`/products/${Slug.slugify(product.name)}`}><img src={`/${product.image}`} ></img></Link></td>
              <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.name}</Link></td>
              <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.product_type}</Link></td>
              <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.size}</Link></td>
              <td><Link href={`/products/${Slug.slugify(product.name)}`}>£{product.price}</Link></td>
              <td><Link href={`/products/${Slug.slugify(product.name)}`}>{product.collection}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 </>
  )
}

export default CollectionView