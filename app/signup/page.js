"use client"

import React from 'react'
import { Signup as SignupComponent } from '@/components/index'
import AuthLayout from '@/components/AuthLayout'

const page = () => {
  return (
    <div className='py-8'>
      <AuthLayout authentication={false}>
        <SignupComponent />
      </AuthLayout>
    </div>
  )
}

export default page