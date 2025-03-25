import React from 'react'
import Link from 'next/link'

interface NavCardProps {
    name: string
    path: string
}

const NavCard = ({name, path}: NavCardProps) => {
  return (
    <div className="card w-96 bg-base-100 card-xl shadow-sm" data-theme='dark'>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>Your one-stop look at all LUSH products, past and present.</p>
    <div className="card-actions">
      <Link href={path} className="btn bg-stone-50 text-stone-950 w-full mt-4">View</Link>
    </div>
  </div>
</div>
  )
}

export default NavCard