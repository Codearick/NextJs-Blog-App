"use client"

import React, {useState} from 'react'
import authService from '@/app/appwrite/auth'
import { login } from '@/app/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input, Button, } from './index'

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const { register, handleSubmit} = useForm();

  const signupHandler = async (data) => {
    setErrors("");
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
      setErrors(error.message)
    }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className={`mx-auto my-5 w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-white/30`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="my-3 text-center text-base text-white">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-medium text-blue-500 text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}

        <form onSubmit={handleSubmit(signupHandler)}>
          <div className='space-y-5'>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (_,value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup