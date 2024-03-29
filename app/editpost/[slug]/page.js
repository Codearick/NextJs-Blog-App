"use client"

import React, {useState, useEffect} from 'react'
import {Container, PostForm} from '@/components/index'
import appWriteService from '@/app/appwrite/appwriteConfig'
import { useRouter, useParams } from 'next/navigation';
import AuthLayout from '@/components/index';

const page = () => {
    const [post, setPost] = useState([])
    const {slug} = useParams();
    const router = useRouter();

    useEffect(() => {
        if(slug){
            appWriteService.getPost(slug).then(post => {
                if(post){
                    setPost(post)
                }
            })
        } else{
            router.push('/')
        }
    },[slug, router])


  return post ? (
    <AuthLayout authentication>
    {" "}
    <div className='py-8'>
        <Container>
            <PostForm
                post={post}
            />
        </Container>
    </div>
    </AuthLayout>
  )
  : null
}

export default page