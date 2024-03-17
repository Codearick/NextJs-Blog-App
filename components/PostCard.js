import React from 'react'
import Service from '@/app/appwrite/appwriteConfig'
import Link from 'next/link'
import Image from 'next/image'


const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link href={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-lg p-4'>
                <div className="w-full justify-center mb-4">
                <Image
                    className='rounded-lg'
                    fill={true}
                    objectFit='contain'
                    src={Service.getFilePreview(featuredImage)}
                    alt={title}
                    loading='lazy'
                    placeholder="blur"
                />
                </div>
                <h2 className='font-bold text-xl'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard