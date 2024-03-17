import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import authService from '@/app/appwrite/auth'
import { Logo, Input, Button } from './index'
import { logo as authLogin } from '@/app/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
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
                    dispatch(authLogin(userData));
                    router.push("/");
                }
            }
        } catch (error) {
            setError("")
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
                    <Link
                        href="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-8' method='POST'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {
                            ...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => {
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address"
                                    }
                                }
                            })}
                             />
                        <Input
                            label = "Password:"
                            placeholder = "Enter your password"
                            type = "password"
                            {
                                ...register("password",{
                                    required : true,
                                    validate: {
                                        matchPattern: /^(?=.*[A-Z]).{7,}$/,
                                        message: "Password length must be 7"
                                    }
                                })
                            }
                        />
                        <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login