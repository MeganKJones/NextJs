'use client'
import React, {useState} from 'react'
import NavBar from '@/app/components/NavBar'
import Link from 'next/link'
import styles from "./../../new/Page.module.css"
import types from './../../types.json'
import Slug from '@/app/lib/slugify'


interface Props {
    params: {
      slug: string
    }
  }

const EditTypePage = ({params}: Props) => {
  const slug = params.slug

  const productType = types.find(
    (c) => Slug.slugify(c.name) === slug
  )

  if (!productType) {
    if (typeof window !== 'undefined') {
      window.location.href = "/productTypes"
    }
    return null // or loading UI
  }


const [form, setForm] = useState({
  id: String(productType?.id) || '',
  name: productType?.name || '',
  desc: productType?.desc || ''
})

const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = event.target
  setForm((prev) => ({ ...prev, [name]: value }))
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const formData = new FormData()
  for (const key in form) {
    formData.append(key, form[key as keyof typeof form])
  }

  const res = await fetch('/api/editTypes', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(productType?.id),
      name: form.name,
      desc: form.desc
    })
  })

  if (res.ok) {
    alert('Product type edited!')

    window.location.href = "/productTypes";
  } else {
    alert('Something went wrong.')
  }
}

  return (<>
    <NavBar></NavBar>
    <div className="breadcrumbs text-sm ps-4">
      <ul>
        <li><Link href="/"> Home</Link></li>
        <li><Link href="/productTypes">Product Types</Link></li>
        <li><p>Edit {productType?.name ?? Slug.unslugify(slug)}</p></li>
      </ul>
    </div>
    <div className="overflow-x-auto min-h-96 mt-12">
      <h1 className='flex justify-center' >Edit {productType?.name ?? Slug.unslugify(slug)}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center mt-12'>
      <input type="number" value={form.id} name="id" hidden readOnly></input>
        <label className="input">
          <span className="label">Product type</span>
          <input type="text" name='name' value={form.name} required onChange={handleChange}/>
        </label>

        <fieldset className={styles.fieldset}>
            <legend className={styles.fieldsetLegend}>Description</legend>
            <textarea name='desc' value={form.desc} className={styles.textAreaStyles} placeholder="Please write a short description of the product type." required onChange={handleChange}></textarea>
        </fieldset>
      <button className='btn bg-stone-950 rounded-xl text-white w-80'>Edit Product type</button>

      </form>
    </div>
</>)
}

export default EditTypePage