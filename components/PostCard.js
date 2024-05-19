import React from 'react'
import Service from '@/app/appwrite/appwriteConfig'
import Link from 'next/link'
import Image from 'next/image'


const PostCard = ({ post }) => {
    const img = Service.getFilePreview(post.featuredImage);
    const link = `/blog/${post.$id}`
    const date = new Date(post.$createdAt).toLocaleDateString('en-US');
    return (
        <Link href={link}>
            <div className='w-full bg-gray-100 text-black p-4 max-w-md shadow-xl rounded-xl overflow-hidden h-full'>
                <div className="relative w-full h-64 mb-4">
                    <Image
                        className='rounded-lg'
                        src={img}
                        alt={post.title}
                        layout='fill'
                        objectFit='contain'
                        priority
                    />
                </div>

                <div className="sm:px-6 px-2 py-4 flex flex-wrap justify-between items-center">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <p className="text-sm">{date}</p>
                </div>


                <h2 className='font-bold text-xl text-black'>{post.title}</h2>
            </div>
        </Link>
    )
}

export default PostCard