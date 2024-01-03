import { KeyRound, Mail, Shield } from 'lucide-react'
import React from 'react'

const SecurityCardContent = () => {
  return (
    <div>
      <div className='flex my-4 mt-0'>
        <Shield className='w-6 h-6 mx-4'/>
        <p>2 Step Verification</p>
      </div>

      <div className='flex my-4'>
        <KeyRound className='w-6 h-6 mx-4'/>
        <p>Change Password</p>
      </div>

      <div className='flex my-4'>
        <Mail className='w-6 h-6 mx-4'/>
        <p>Change E-mail</p>
      </div>
    </div>
  )
}

export default SecurityCardContent