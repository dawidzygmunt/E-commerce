"use client"

import { Session } from 'inspector';
import { SessionProvider } from 'next-auth/react'
import { ReactNode, FC } from 'react';

interface ProviderProps {
  children: ReactNode,
}

export const ProviderSession: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
