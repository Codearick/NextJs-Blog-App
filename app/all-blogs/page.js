"use client"

import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '@/components/index'
import appwriteService from "@/app/appwrite/appwriteConfig";
import AuthLayout from '@/components/AuthLayout'
import { Skeleton } from '@/components/index';

function Page() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).catch((error) => console.log("Failed to get all posts from appwrite", error));
    }, [])

    if (posts.length == 0) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Skeleton />
            </div>
        )
    }
    
    return (
        <div className='min-h-[100vh]'>
            <AuthLayout authentication>
                {" "}
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard post = {post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </AuthLayout>
        </div>
    )
}

export default Page

