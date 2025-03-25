'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/searchResults?query=${encodeURIComponent(searchTerm)}`)
    }
  }


  return (
    <div className="navbar p-5 bg-base-100 shadow-sm" data-theme='dark'>
  <div className="flex-1">
    <Link href='/' className="btn btn-ghost text-xl"><img src='/lush_logo.png'></img></Link>
  </div>
  <div className="flex gap-2">
    <form onSubmit={handleSearch} className="flex gap-2">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    </form>
    <div className="dropdown dropdown-end">
    </div>
  </div>
</div>

  )
}

export default NavBar