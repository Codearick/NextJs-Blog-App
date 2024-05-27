"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/app/appwrite/auth';
import { Input, Button } from './index';
import { login as authLogin } from '@/app/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();
    const [error, setError] = useState("");

    const onSubmitForm = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            console.log("SESSION :: ", session);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    console.log("login component: ", userData);
                    dispatch(authLogin(userData));
                }
                router.push("/");
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className='min-h-[90vh] flex items-center justify-center'>
            <div className='mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-white/30'>
                <h2 className="text-center text-2xl font-bold leading-tight">Login to your account</h2>
                <p className="mt-2 text-center text-base text-white">
                    Don&apos;t have an account?&nbsp;
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
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address"
                                }
                            })}
                        />
                        {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                        <Button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full flex items-center justify-center"
                        >
                            {isSubmitting ? "Submitting..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
