"use client"

import { Session } from 'inspector';
import { SessionProvider } from 'next-auth/react'
import { ReactNode, FC } from 'react';

interface ProviderProps {
  children: ReactNode,
}

export const ProviderSession: FC<ProviderProps> = ({ children }) => {
  console.log(process.env.NEXTAUTH_URL);
  
  return (
    // basePath='/e-commerce/api/auth'
    <SessionProvider basePath="/e-commerce/api/auth">
      {children}
    </SessionProvider>
  )
}
