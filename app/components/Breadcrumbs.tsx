import React from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
    current?: string
    linkOne?: string
    linkOnePath?: string
    linkTwo?: string
    linkTwoPath?: string
}

const Breadcrumbs = ({current, linkOne, linkOnePath, linkTwo, linkTwoPath}: BreadcrumbProps) => {
  return (
    <div className="breadcrumbs text-sm ps-4">
      <ul>
      <li><Link href="/"> Home</Link></li>
      {linkOne && linkOnePath && (
        <li><Link href={linkOnePath}>{linkOne}</Link></li>
      )}
        {linkTwo && linkTwoPath && (
        <li><Link href={linkTwoPath}>{linkTwo}</Link></li>
        )}
        {current && (
        <li><p>{current}</p></li>
        )}</ul>
    </div>
  )
}

export default Breadcrumbs
