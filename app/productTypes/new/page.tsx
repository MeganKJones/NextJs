'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import styles from "./Page.module.css"
import Breadcrumbs from '@/app/components/Breadcrumbs'

const NewProductPage = () => {
const [form, setForm] = useState({
  name: '',
  desc: ''
})

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setForm({ ...form, [event.target.name]: event.target.value })
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const formData = new FormData()
  for (const key in form) {
    formData.append(key, form[key as keyof typeof form])
  }

  const res = await fetch('/api/types', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

  if (res.ok) {
    alert('Product type added!')
    window.location.href = "/productTypes"
  } else {
    alert('Something went wrong.')
  }
}

  return (<>
    <Breadcrumbs current='Add New Product Type' linkOne='Product Types' linkOnePath='/productTypes'></Breadcrumbs>
    <div className="overflow-x-auto min-h-96 mt-12">
      <h1 className='flex justify-center' >Add New Product type</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center mt-12'>
     
        <label className="input">
          <span className="label">Product type Name</span>
          <input type="text" name='name' required onChange={handleChange}/>
        </label>

        <fieldset className={styles.fieldset}>
            <legend className={styles.fieldsetLegend}>Description</legend>
            <textarea name='desc' className={styles.textAreaStyles} placeholder="Please write a short description of the Product type." required onChange={handleChange}></textarea>
        </fieldset>
      <button className='btn bg-stone-950 rounded-xl text-white w-80'>Add Product type</button>

      </form>
    </div>
</>)
}

export default NewProductPage