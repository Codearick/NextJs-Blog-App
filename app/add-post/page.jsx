import {Container, PostForm} from '@/components/index'

import React from 'react'

const page = () => {
  return (
    <div className='p-4'>
    <Container>
        <PostForm classname={"min-h-full"}/>
    </Container>
    </div>
  )
}

export default page