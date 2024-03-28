'use client'

import React, { useEffect, useState } from 'react'
import appWriteService from '@/app/appwrite/appwriteConfig'
import authService from './appwrite/auth'
import { Container, PostCard } from "@/components/index"
import Link from 'next/link'

const page = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        appWriteService.getPosts().then(posts => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
        authService.getCurrentUser().then(user => {
            if(user)setIsLoggedIn(true)
        })
    }, [])


    if (isLoggedIn === false) {
        return (
            <div className="w-full min-h-[90vh] py-8 mt-4 text-center">
                <Container>
                    <div className="flex items-center justify-center my-auto">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            <Link href={"/login"}>
                                <p className='text-blue-500 hover:underline'>click here to login</p>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full min-h-[90vh] py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map(post => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default page
