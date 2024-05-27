"use client"

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import appwriteService from "@/app/appwrite/appwriteConfig";
import { Button, Container } from "@/components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

function Post() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const router = useRouter();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else router.push("/");
            });
        } else router.push("/");
    }, [slug, router]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                router.push("/");
            }
        });
    };

    if (!post) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <Container/>
            </div>
        )
    }

    return post ? (
        <div className="py-8 min-h-[100vh]">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            
                    <div className="PreviewImage relative w-full h-15 p-2">
                        <Image
                            src={appwriteService.getFilePreview(post.featuredImage).href}
                            alt={post.title}
                            className="rounded-xl h-auto"
                            width={500}
                            height={500}
                            layout=""
                        />
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link href={`/Editpost/${post.$id}`}>
                                <Button className="mr-3 bg-green-500">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;