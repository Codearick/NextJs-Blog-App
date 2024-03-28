import React from 'react'
import Service from '@/app/appwrite/appwriteConfig'
import Link from 'next/link'
import Image from 'next/image'


const PostCard = ({ $id, title, featuredImage }) => {
    const img = Service.getFilePreview(featuredImage);
    const link = `/blog/${$id}`
    return (
        <Link >
            <div className='w-full bg-gray-100 rounded-lg p-4'>
                <div className="relative w-full h-auto justify-center mb-4">
                <Image
                    className='rounded-lg'
                    fill={true}
                    objectFit='contain'
                    src={img}
                    alt={title}
                    priority
                />
                </div>
                <h2 className='font-bold text-xl text-black'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard