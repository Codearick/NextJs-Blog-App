"use client"

import { useState, useEffect } from 'react'
import appWriteService from '@/app/appwrite/appwriteConfig'
import { PostCard, Container } from '@/components/index'

import React from 'react'

const page = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {

  }, [])

  appWriteService.getPosts([]).then(posts => {
    if (posts) {
      setPosts(posts.documents)
    }
  }).catch(error => console.error("Kuch error hai bhai: ", error.message))

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap '>
          {posts.map(post => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard post={post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default page