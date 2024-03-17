import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appWriteService from '@/app/appwrite/appwriteConfig'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


const page = ({ post }) => {
    const { register, handleSubmit, watch, setValue,
        control, getValues } = useForm({
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post.content ? post.content : '',
                status: post.status ? post.status : 'active'
            }
        });
    const router = useRouter();
    const userData = useSelector(state => state.auth.userData)

    const submitHandler = async (data) => {
        if (post) {
            const file = data.image[0] ? await appWriteService.uploadFile(data.image[0])
                : null;

            if (file) {
                appWriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appWriteService.updatePost(
                post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                router.push(`/post/${dbPost.$id}`)
                appWriteService.updatePost(dbPost)
            }
        } else {
            const file = data.image[0] ? await appWriteService.uploadFile
                (data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                userData.featuredImage = fileId;
                const dbPost = await appWriteService.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) router.push(`/post/${data.id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => { })

        return subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form action="post" onSubmit={handleSubmit(submitHandler)} className='flex flex-wrap'>
            <div className="w-2/3 px-2">
                <Input
                    label="title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug"
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
                    ...register("image",{required : !post})
                }
                />
            </div>
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
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
        </form>
    )
}

export default page