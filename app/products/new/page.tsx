'use client'
import React, {useState} from 'react'
import NavBar from '@/app/components/NavBar'
import collections from './../../collections/collections.json'
import productTypes from './../../productTypes/types.json'
import Link from 'next/link'

const NewProductPage = () => {
const [form, setForm] = useState({
  name: '',
  product_type: '',
  size: '',
  price: '',
  collection: ''
})
const [file, setFile] = useState<File | null>(null)

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setForm({ ...form, [event.target.name]: event.target.value })
}

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files?.[0]) {
    setFile(event.target.files[0])
  }
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const formData = new FormData()
  for (const key in form) {
    formData.append(key, form[key as keyof typeof form])
  }
  if (file) {
    formData.append('image', file)
  }

  const res = await fetch('/api/products', {
    method: 'POST',
    body: formData,
  })

  if (res.ok) {
    alert('Product added!')
    window.location.href = "/products"
  } else {
    alert('Something went wrong.')
  }
}

  return (<>
    <NavBar></NavBar>
    <div className="breadcrumbs text-sm ps-4">
      <ul>
        <li><Link href="/"> Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><p>Add New Product</p></li>
      </ul>
    </div>
    <div className="overflow-x-auto min-h-96 mt-12">
      <h1 className='flex justify-center' >Add New Product</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center min-h-96 mt-12'>
     
        <label className="input">
          <span className="label">Product Name</span>
          <input type="text" name='name' required onChange={handleChange}/>
        </label>
        <label className="input">
          <span className="label">Product Type</span>
          <select name='product_type' value={form.product_type} className="select select-ghost" required onChange={handleChange}>
            <option disabled={true} value="">Product Type</option>
            {[...new Set(productTypes.map(p => p.name))].map((type, index) => (
            <option key={index} value={type}>
            {type}
            </option>
            ))}
          </select>
        </label>
        <label className="input">
          <span className="label">Product Weight/Size</span>
          <input type="text" name='size' placeholder="0g" required onChange={handleChange}/>
        </label>
        <label className="input">
          <span className="label">Price</span>
          <input type="text" name='price' placeholder="£0.00" required onChange={handleChange}/>
        </label>
        <label className="input">
          <span className="label">Collection</span>
          <select name='collection' value={form.collection} className="select select-ghost" required onChange={handleChange}>
            <option disabled={true} value="">Product collection</option>
            {collections.map(product =>
              <option key={product.id}>{product.name}</option>
          )}
          </select>
        </label>

        <div className='flex flex-col items-center mt-4 border border-zinc-300 rounded-md'> 
          <p className='p-3 zinc-300'>Product image</p>
          <input type="file" name="image" accept="image/*" className="file-input file-input-ghost ms-2 mb-2" onChange={handleFileChange}/>
        </div>
          
      <button className='btn bg-stone-950 rounded-xl text-white w-80'>Add Product</button>

      </form>
    </div>
</>)
}

export default NewProductPage