

import React from 'react'
import { Login as LoginComponent } from '@/components/index'
import AuthLayout from '@/components/AuthLayout'

const page = () => {
  return (
    <div className='py-8'>
      <AuthLayout authentication={false}>
        <LoginComponent />
      </AuthLayout>
    </div>
  )
}

export default page