import React from 'react'
import appwriteService from '@/app/appwrite/appwriteConfig'
import Link from 'next/link'
import Image from 'next/image'


const PostCard = ({ post }) => {
    const img = appwriteService.getFilePreview(post.featuredImage);
    const link = `/blog/${post.$id}`
    const date = new Date(post.$createdAt).toLocaleDateString('en-US');
    return (
        <Link href={`${link}`}>
            <div className="max-w-md border border-[rgb(139,137,139)] px-5 py-7 shadow-xl rounded-xl overflow-hidden h-full">
                <Image 
                    className="w-full h-auto" 
                    src={img.href} 
                    alt={post.title} 
                    width={800}
                    height={500}
                />

                <div className="sm:px-6 px-2 py-4 flex flex-wrap justify-between items-center">
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <div className="mt-2 text-sm">{date}</div>
                </div>

                <div className="px-6 py-4 flex justify-between items-center">
                    <div className="text-sm">{post.status}</div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard