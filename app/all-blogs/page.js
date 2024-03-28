"use client"

import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '@/components/index'
import appwriteService from "@/app/appwrite/appwriteConfig";
import AuthLayout from '@/components/AuthLayout'

function page() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
    return (
        <div className='min-h-[100vh]'>
            <AuthLayout authentication>
                {" "}
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                        {posts.length == 0 && <div className='text-xl text-white'>Oops! No Posts to show!</div>}
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </AuthLayout>
        </div>
    )
}

export default page

