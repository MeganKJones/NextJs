'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import styles from "./../../new/Page.module.css"
import collections from '../../collections.json'
import Slug from '@/app/lib/slugify'
import Breadcrumbs from '@/app/components/Breadcrumbs'


interface Props {
    params: {
      slug: string
    }
  }

const NewProductPage = ({params}: Props) => {
  const slug = params.slug

  const collection = collections.find(
    (c) => Slug.slugify(c.name) === slug
  )

  if (!collection) {
    if (typeof window !== 'undefined') {
      window.location.href = "/collections"
    }
    return null // or loading UI
  }


const [form, setForm] = useState({
  id: String(collection?.id) || '',
  name: collection?.name || '',
  desc: collection?.desc || ''
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

  const res = await fetch('/api/editCollections', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(collection?.id),
      name: form.name,
      desc: form.desc
    })
  })

  if (res.ok) {
    alert('Collection edited!')

    window.location.href = "/collections";
  } else {
    alert('Something went wrong.')
  }
}

  return (<>
    <Breadcrumbs current={`Edit ${collection?.name ?? Slug.unslugify(slug)}`} linkOne='Collections' linkOnePath='/collections'></Breadcrumbs>
    <div className="overflow-x-auto min-h-96 mt-12">
      <h1 className='flex justify-center' >Edit {collection?.name ?? Slug.unslugify(slug)}</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center items-center mt-12'>
      <input type="number" value={form.id} name="id" hidden readOnly></input>
        <label className="input">
          <span className="label">Collection Name</span>
          <input type="text" name='name' value={form.name} required onChange={handleChange}/>
        </label>

        <fieldset className={styles.fieldset}>
            <legend className={styles.fieldsetLegend}>Description</legend>
            <textarea name='desc' value={form.desc} className={styles.textAreaStyles} placeholder="Please write a short description of the collection." required onChange={handleChange}></textarea>
        </fieldset>
      <button className='btn bg-stone-950 rounded-xl text-white w-80'>Edit Collection</button>

      </form>
    </div>
</>)
}

export default NewProductPage