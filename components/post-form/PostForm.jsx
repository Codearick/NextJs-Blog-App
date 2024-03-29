'use client'
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appWriteService from '@/app/appwrite/appwriteConfig'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


const page = ({ post }) => {
    const { register, handleSubmit, watch, setValue,
        control, getValues, formState: { isSubmitting } } = useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.$id || '',
                content: post?.content || '',
                status: post?.status || 'active'
            }
        });
    const router = useRouter();
    const userData = useSelector((state) => state.auth.userData);
    console.log("TEST this is userDATA: ",userData);

    const submitHandler = async (data) => {
        if (post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appWriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appWriteService.updatePost(
                post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                router.push(`/blog/${dbPost.$id}`);
            }
        } else {
            const file = await appWriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appWriteService.createPost({ ...data, userId : userData.$id })
                // const dbPost = await appWriteService.createPost({ ...data })
                if (dbPost) {
                    router.push(`/blog/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form action="post" onSubmit={handleSubmit(submitHandler)} className='flex flex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug(ignore)"
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
                    accept="image/png image/jpg image/gif image/jpeg image/heif"
                    {
                    ...register("image", { required: !post })
                    }
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
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
                <Button disabled={isSubmitting} type="submit" className={post ? "bg-green-500" : undefined +"w-full flex items-center justify-center"}>
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default page