import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm, Link } from '@inertiajs/react';
import { CornerDownLeft, Paperclip, MessageSquare } from "lucide-react";
import { Label } from "@/Components/ui/label.tsx";
import { Textarea } from "@/Components/ui/textarea.tsx";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/Components/ui/tooltip.tsx";
import { Button } from "@/Components/ui/button.tsx";
import { Card, CardContent } from "@/Components/ui/card.tsx";
import { Input } from "@/Components/ui/input.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel.tsx";
import { useToast } from "@/Components/ui/use-toast.ts";
import InputError from "@/Components/InputError.jsx";
import __ from "@/Components/translate.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/ui/dialog";
import AccountSidebar from "@/Components/AccountSidebar.jsx";

export default function Dashboard({ auth, posts, locale, last_followers }) {
    console.log(last_followers);

    const { showToast, ToastContainer } = useToast();

    const { data: postData, setData: setPostData, post: createPost, processing: postProcessing, errors: postErrors, reset: resetPostForm } = useForm({
        content: '',
        images: null,
    });

    const { data: replyData, setData: setReplyData, post: createReply, processing: replyProcessing, errors: replyErrors, reset: resetReplyForm } = useForm({
        replyContent: '',
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setPostData('images', files);

        const filePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(filePreviews);
    };

    const submitPost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', postData.content);

        if (postData.images) {
            Array.from(postData.images).forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });
        }

        createPost(route('posts.store'), {
            data: formData,
            onSuccess: () => {
                resetPostForm('content', 'images');
                setImagePreviews([]);
            },
            onError: (errors) => {
                postErrors.images = Object.values(errors).flat().join('\n');
            }
        });
    };

    const submitReply = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('replyContent', replyData.replyContent);

        createReply(route('replies.store', currentPostId), {
            data: formData,
            onSuccess: () => {
                resetReplyForm('replyContent');
                setShowReplyModal(false);
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    const openReplyModal = (postId) => {
        setCurrentPostId(postId);
        setShowReplyModal(true);
    };

    return (
        <AppLayout current_page="home">
            <main className="flex flex-1 justify-between">
                <div className="flex flex-col w-full p-6">
                    <form onSubmit={submitPost} className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                        <Textarea
                            id="message"
                            value={postData.content}
                            placeholder={__('type_message')}
                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => setPostData('content', e.target.value)}
                        />

                        {imagePreviews.length > 0 && (
                            <div className="w-full px-14 pt-2">
                                <Carousel className="w-full">
                                    <CarouselContent className="-ml-1 w-full">
                                        {imagePreviews.map((src, index) => (
                                            <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                <div className="p-1">
                                                    <Card className="bg-cover bg-center" style={{ "background-image": `url(${src})` }} >
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious type="button" />
                                    <CarouselNext type="button" />
                                </Carousel>
                            </div>
                        )}

                        <InputError message={postErrors.content} />
                        <InputError message={postErrors.images} />

                        <div className="flex items-center p-3 pt-2">
                            <Input type="file" id="attachements" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" type="button" htmlFor="attachements" asChild>
                                            <Label className="cursor-pointer">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">{ __('attach_file') }</span>
                                            </Label>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p>{ __('attach_file') }</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                { __('send_message') }
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                    </form>
                    <h1 className="text-lg font-semibold md:text-2xl my-4">{ __('news') }</h1>
                    <div className="flex flex-col gap-4">
                        {posts.map((post, index) => (
                            <Link href={route('posts.show', post.id)} className="flex flex-col gap-2">
                                <div key={index} className="flex flex-1 justify-between gap-3 border rounded-lg p-4">
                                    <Link href={`/profile/${post.createur.tag}`}>
                                        <Avatar className="hidden h-10 w-10 sm:flex">
                                            <AvatarImage src={`/user/avatar/userAvatar-${ post.createur.id }`} alt={ post.createur.name } />
                                            <AvatarFallback>{post.createur.name.split(' ').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className="flex flex-col w-full">
                                        <div className="grid w-full">
                                            <Link href={`/profile/${post.createur.tag}`} className="flex align-middle gap-2 font-bold leading-none hover:underline">
                                                {post.createur.name}
                                                <span className="text-sm font-medium text-muted-foreground">@{post.createur.tag}</span>
                                            </Link>
                                            <p className="w-full">{post.content}</p>

                                            {post.number_of_images > 0 && (
                                                <div className="w-full pr-14 pt-2">
                                                    <Carousel className="w-full">
                                                        <CarouselContent className="-ml-1 w-full">
                                                            {Array.from({ length: post.number_of_images }).map((_, index) => (
                                                                <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                                    <div className="p-1">
                                                                        <Card className={`bg-cover bg-center`} style={{ "background-image": `url("/posts/attachement/post-${post.id}_${index}")` }}>
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

                                            <Button variant="ghost" size="icon" onClick={(e) =>  { e.preventDefault(); openReplyModal(post.id) }}>
                                                <MessageSquare className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <AccountSidebar data={last_followers}/>
            </main>

            <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reply to Post</DialogTitle>
                        <DialogClose />
                    </DialogHeader>
                    <form onSubmit={submitReply}>
                        <Textarea
                            id="reply-content"
                            value={replyData.replyContent}
                            placeholder="Type your reply"
                            className="min-h-12 resize-none border p-2 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => setReplyData('replyContent', e.target.value)}
                        />
                        <Button type="submit" size="sm" className="mt-2">
                            Reply
                        </Button>
                        <InputError message={replyErrors.replyContent} />
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
