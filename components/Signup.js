"use client"

import React from 'react'
import authService from '@/app/appwrite/auth'
import { login } from '@/app/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Logo, Button, } from './index'

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const signupHandler = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData) {
          dispatch(login(userData))
          router.push("/");
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className="logo mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link href="/signup">
            <div className="font-medium text-primary transition-all duration-200 hover:underline"
            >Sign Up</div>
          </Link>
        </p>
        {errors && <div className='text-red-600 mt-8 text-center'>{errors}</div>}
        <form method='post' onSubmit={handleSubmit(signupHandler)}>
          <div className='space-y-5'>
            <Input
              type="email"
              placeholder="Enter your email"
              label="Email: "
              {
              ...register("email", {
                required: true,
                validate: {
                  matchPattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Enter correct email"
                }
              })
              }
            />
            {errors.email && <div className='text-sm text-red-600'>{errors.email}</div>}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {
              ...register("password", {
                validate: {
                  matchPattern: /^(?=.*[A-Z]).{7,}$/,
                  message: "Password length must be 7"
                }
              })
              }
            />
            {errors.password && <div className='text-sm text-red-600'>{errors.password}</div>}
            <Input
              type="Username"
              placeholder="Enter your full name"
              label="Full Name: "
              {
              ...register("name", {
                required: true,
                minLength: { value: 5, message: "Minimum length must be 5" },
                maxLength: { value: 12, message: "Maximum length must be 12" }
              })
              }
            />
            {errors.name && <div className='text-sm text-red-600'>{errors.name}</div>}
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

}

export default Signup



