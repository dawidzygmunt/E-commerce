"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

export default function Test123() {
  const { data: session, status } = useSession();
  console.log(session);
  
  if (session?.user) {
    return (
      <div>
        {session?.user.name}
      </div>
    )
  }

  return (
    <div>
      <p>Test123</p>
    </div>
  )
}

