import React from 'react'
import Link from 'next/link'
import NavCard from '../components/NavCard'
import collections from './collections.json'
import Slug from '../lib/slugify'

const CollectionsPage = () => {
  return (
    <>
    <div className="breadcrumbs text-sm ps-4">
       <ul>
         <li><Link href="/"> Home</Link></li>
         <li><p>Collections</p></li>
       </ul>
     </div>
     <div className='flex justify-end'>
    <Link className='btn bg-stone-950 text-stone-50 rounded-xl mb-6 me-5' href="/collections/new">Add new collection</Link>
    </div>
    <div className='flex gap-4 flex-wrap justify-center mt-12 items-stretch'>
        {collections.slice().sort((a, b) => a.name.localeCompare(b.name)).map(collection =>
                <NavCard key={collection.id} name={collection.name} path={`/collections/${Slug.slugify(collection.name)}`} desc={collection.desc} ></NavCard>
            )}
    </div>
    </>
  )
}

export default CollectionsPage
