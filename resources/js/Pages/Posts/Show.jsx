import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';
import { CornerDownLeft, MessageSquare, ArrowLeft } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea.tsx";
import { Button } from "@/Components/ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.tsx";
import InputError from "@/Components/InputError.jsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";
import {Card, CardContent} from "@/Components/ui/card";

export default function Show({ auth, post }) {
    const { data, setData, post: submitReply, processing, errors, reset } = useForm({
        replyContent: '',
    });

    const submit = (e) => {
        e.preventDefault();

        submitReply(route('replies.store', post.id), {
            data,
            onSuccess: () => {
                reset('replyContent');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <AppLayout auth={auth}>
            <div className="px-6 pt-4">
                <Button onClick={() => history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2"></ArrowLeft>
                    Retour
                </Button>
            </div>

            <div className="w-full p-6 bg-black text-white min-h-screen">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-1 justify-between gap-3 border rounded-lg p-4">
                        <Avatar className="hidden h-10 w-10 sm:flex">
                            <AvatarImage src={`/user/avatar/userAvatar-${post.createur.id}.webp`} alt={post.createur.name} />
                            <AvatarFallback>{post.createur.name.split(' ').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col w-full">
                            <div className="grid w-full">
                                <Link href={route('posts.show', post.id)} className="flex flex-col gap-2">
                                    <p className="flex align-middle gap-2 font-bold leading-none">
                                        {post.createur.name}
                                        <span className="text-sm font-medium text-muted-foreground">@{post.createur.tag}</span>
                                    </p>
                                    <p className="w-full">{post.content}</p>
                                </Link>

                                {post.number_of_images > 0 && (
                                    <div className="w-full pr-14 pt-2">
                                        <Carousel className="w-full">
                                            <CarouselContent className="-ml-1 w-full">
                                                {Array.from({ length: post.number_of_images }).map((_, index) => (
                                                    <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                        <div className="p-1">
                                                            <Card className={`bg-cover bg-center`} style={{ "background-image": `url("/posts/attachement/post-${post.id}_${index}.webp")` }}>
                                                                <CardContent className="flex aspect-square items-center justify-center p-6" />
                                                            </Card>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            {post.number_of_images > 2 && (
                                                <div>
                                                    <CarouselPrevious />
                                                    <CarouselNext />
                                                </div>
                                            )}
                                        </Carousel>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="my-6">
                    <Textarea
                        id="reply-content"
                        value={data.replyContent}
                        placeholder="Type your reply"
                        className="min-h-12 resize-none border p-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        onChange={(e) => setData('replyContent', e.target.value)}
                    />
                    <Button type="submit" size="sm" className="mt-2">
                        Reply
                        <CornerDownLeft className="ml-1 size-3.5" />
                    </Button>
                    <InputError message={errors.replyContent} />
                </form>

                <div className="flex flex-col gap-4">
                    {post.replies && post.replies.map(reply => (
                        <div className="flex flex-1 justify-between gap-3 border rounded-lg p-4">
                        <Avatar className="hidden h-10 w-10 sm:flex">
                            <AvatarImage src={`/user/avatar/userAvatar-${reply.user.id}.webp`} alt={reply.user.name} />
                            <AvatarFallback>{reply.user.name.split(' ').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col w-full">
                            <div className="grid w-full">
                                <p className="flex align-middle gap-2 font-bold leading-none">
                                    {reply.user.name}
                                    <span className="text-sm font-medium text-muted-foreground">@{reply.user.tag}</span>
                                </p>
                                <p className="w-full">{reply.content}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
