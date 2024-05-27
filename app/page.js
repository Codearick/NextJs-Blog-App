'use client'

import React, { useEffect, useState } from 'react';
import appWriteService from '@/app/appwrite/appwriteConfig';
import { Container, PostCard } from "@/components/index";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/components/index';

const Page = () => {
    const [posts, setPosts] = useState([]);

    const userData = useSelector(state => state.auth.userData);
    console.log("USERDATA :: ", userData);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        appWriteService.getPosts([])
            .then(posts => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch(error => console.error("Failed to get all posts from Appwrite", error));
    }, []);

    if (posts.length === 0 && authStatus) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
            <Skeleton/>
            </div>
        )
    }

    if ( authStatus === false ||  posts.length === 0 ) {
        return (
            <div className="w-full min-h-[90vh] py-8 mt-4 text-center">
                <Container >
                    <div className="flex items-center justify-center my-auto">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                            <Link href="/login">
                                <p className="text-blue-500 hover:underline">Click here to login</p>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[90vh] py-8">
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Page;
