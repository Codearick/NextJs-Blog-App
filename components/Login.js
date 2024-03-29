"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import authService from '@/app/appwrite/auth'
import { Input, Button } from './index'
import { login as authLogin } from '@/app/store/slices/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm()
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setError(" ");
        try {
            const session = authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    console.log("login component: ",userData)
                    dispatch(authLogin(userData));
                    const userid = useSelector((state) => state.auth.userData.$id);
                    console.log("Login component:: userid: ",userid)
                }
                // router.push("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='min-h-[90vh] flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-white/30'>
                <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
                <p className="mt-2 text-center text-base text-white">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        href="/signup"
                        className="font-medium text-blue-600 text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {error.length > 1 ? <div className='text-red-600'>{error}</div> : null}
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full flex items-center justify-center"
                        >{isSubmitting ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="white">
                            <path d="M12 3V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M21 12L18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M18.3635 5.63672L16.2422 7.75804" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.75706 16.2422L5.63574 18.3635" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M18.3635 18.3635L16.2422 16.2422" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7.75706 7.75804L5.63574 5.63672" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg> : "Sign in"}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login