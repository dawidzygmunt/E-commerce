"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

export default function Test123() {
  const { data: session, status } = useSession();
  console.log(session);
  
  if (session?.user) {
    return (
      <div className='flex flex-col items-center h-full w-full pt-20'>
        <h1 className='font-bold text-2xl '>{session?.user.name}</h1>
        <p>{session?.user.email}</p>

      </div>
    )
  }

  return (
    <div>
      <p>Test123</p>
    </div>
  )
}

