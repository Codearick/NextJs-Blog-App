'use client'

import React, { useEffect, useState } from 'react'
import appWriteService from '@/app/appwrite/appwriteConfig'
import { Container, PostCard } from "@/components/index"
import Link from 'next/link'

const page = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appWriteService.getPosts().then(posts => {
            if (posts) {
                setPosts(posts.documents);
            }
        })
    }, [])

    if (posts.length === 0) {
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
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    { posts.map(post => (
                            <div key={posts.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                </div>
            </Container>
        </div>
    )
}

export default page
