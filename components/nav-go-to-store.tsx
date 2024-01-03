"use client"

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const GoToStoreButton = () => {

  const router = useRouter()
  return (
    <Button className='mr-4' onClick={()=>router.push('https://dawidzygmuntdev.pl/store')}>
      Check Store
    </Button>
  )
}

export default GoToStoreButton