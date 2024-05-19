'use client'

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '../index';
import appwriteService from '@/app/appwrite/appwriteConfig';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Page = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { isSubmitting } } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });
    const router = useRouter();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        try {
            let file;
            if (data.featuredImage && data.featuredImage.length > 0) {
                file = await appwriteService.uploadFile(data.featuredImage[0]);
            }

            if (post) {
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }
                const dbPost = await appwriteService.updatePost(
                    post.$id, {
                        ...data,
                        featuredImage: file ? file.$id : undefined, 
                    }
                );
                if (dbPost) {
                    router.push(`/blog/${dbPost.$id}`);
                }
            } else {
                const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null
;
                
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id }); // problem in accessing userData from redux store.
                    if (dbPost) {
                        router.push(`/blog/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to submit the form: ", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug (ignore)"
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/gif, image/jpeg, image/heif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-full flex items-center justify-center ${post ? "bg-green-500" : ""}`}
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default Page;
