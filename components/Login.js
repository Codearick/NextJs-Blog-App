"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import authService from '@/app/appwrite/auth'
import { Input, Button } from './index'
import { login as authLogin } from '@/app/store/slices/authSlice.js'
import { useDispatch } from 'react-redux'
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

    const onSubmitForm = async (data) => {
        setError(" ");
        try {
            const session = await authService.login(data);
            console.log("SESSION :: ", session);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    console.log("login component: ",userData)
                    dispatch(authLogin(userData)); // userdata not being stored in the redux.
                }
                router.push("/");
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
                <form onSubmit={handleSubmit(onSubmitForm)} className='mt-8'>
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
                        >{isSubmitting ? "Submitting!" : "Sign in"}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login