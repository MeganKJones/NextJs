import React from 'react'
import Link from 'next/link'
import NavCard from '../components/NavCard'
import types from './types.json'
import Slug from '../lib/slugify'
import Breadcrumbs from '../components/Breadcrumbs'

const ProductTypePage = () => {
  return (
    <>
     <Breadcrumbs current='Product Types'></Breadcrumbs>
     <div className='flex justify-end'>
    <Link className='btn bg-stone-950 text-stone-50 rounded-xl mb-6 me-5' href="/productTypes/new">Add new Product Type</Link>
    </div>
    <div className='flex gap-4 flex-wrap justify-center mt-12 items-stretch'>
        {types.slice().sort((a, b) => a.name.localeCompare(b.name)).map(type =>
                <NavCard name={type.name} path={`/productTypes/${Slug.slugify(type.name)}`} desc={type.desc} ></NavCard>
            )}
    </div>
    </>
  )
}

export default ProductTypePage
