import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const isLive = true
  isLive && redirect("/login")
  return (
    <div>page</div>
  )
}

export default page