import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AccountSidebar from '@/Components/AccountSidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";
import {Card, CardContent} from "@/Components/ui/card";
import {Separator} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/Components/ui/button";
import {MessageSquare, Settings, Trash} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea.tsx";
import InputError from "@/Components/InputError.jsx";
import __ from "@/Components/translate.jsx";

export default function Account({ auth, user, posts, isFollowing, last_followers }) {
    const { post } = useForm();

    const { data: replyData, setData: setReplyData, post: createReply, processing: replyProcessing, errors: replyErrors, reset: resetReplyForm } = useForm({
        replyContent: '',
    });

    const { data: deleteData, setData: setdeleteData, delete: deletePost, reset: resetDeleteForm } = useForm({
        postId: '',
    });

    const [bannerLoaded, setBannerLoaded] = useState(true);
    const [following, setFollowing] = useState(isFollowing);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);

    const handleFollow = () => {
        post(route('profile.follow', user.tag), {
            onSuccess: () => {
                setFollowing(true);
            }
        });
    };

    const handleUnfollow = () => {
        post(route('profile.unfollow', user.tag), {
            onSuccess: () => {
                setFollowing(false);
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

    const submitDelete = (e) => {
        e.preventDefault();

        setdeleteData({ postId: currentPostId });
        deletePost(route('posts.destroy', currentPostId));
        setShowDeleteModal(false);
    };

    const openReplyModal = (postId) => {
        setCurrentPostId(postId);
        setShowReplyModal(true);
    };

    const openDeleteModal = (postId) => {
        setCurrentPostId(postId);
        setShowDeleteModal(true);
    };

    return (
        <AppLayout current_page="profile">
            <Head title="Profile" />
            <div className="bg-black text-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-grow max-w-4xl">
                            <header className="relative mb-16">
                                <div className={`w-full h-48 ${bannerLoaded ? '' : 'bg-[#333639]'}`}>
                                    {bannerLoaded && (
                                        <img
                                            src={`/user/banner/userBanner-${ user.id }`}
                                            alt="Banner"
                                            className="w-full h-48 object-cover"
                                            onError={() => setBannerLoaded(false)}
                                        />
                                    )}
                                </div>
                                <div className="absolute -bottom-16 left-4">
                                    <Avatar className="w-32 h-32 rounded-full border-4 border-black">
                                        <AvatarImage src={`/user/avatar/userAvatar-${ user.id }`} alt={ user.name } />
                                        <AvatarFallback>{ user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                    </Avatar>
                                    {/* <img src={`/user/avatar/userAvatar-${ user.id }`} alt={user.name} className="w-32 h-32 rounded-full border-4 border-black" /> */}
                                </div>
                            </header>
                            <main className="mt-20 px-5">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold">{user.name}</h1>
                                    { auth.user.tag !== user.tag ? (
                                        following ? (
                                            <button
                                                onClick={handleUnfollow}
                                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                                            >
                                                { __('unfollow') }
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleFollow}
                                                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
                                            >
                                                { __('follow') }
                                            </button>
                                        )
                                    ) : (
                                        <Link href="/settings" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
                                            { __('edit_profile') }
                                        </Link>
                                    )}
                                </div>
                                <p className="text-gray-400">@{user.tag}</p>
                                <p className="my-4">{user.bio}</p>
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                                    <span className="flex items-center"><span className="mr-1">🗓</span>{ __('register_since') } {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-sm">
                                    <span><strong>{user.followings_count}</strong> { __('followings') }</span>
                                    <span><strong>{user.followers_count}</strong> { __('followers') }</span>
                                </div>
                            </main>

                            <div className="flex flex-col gap-4 p-4 pt-12">
                                {posts.map((post, index) => (
                                    <Link href={route('posts.show', post.id)} className="flex flex-col gap-2">
                                        <div className="flex flex-1 justify-between gap-3 border p-4 rounded-md">
                                            <Link href={`/profile/${post.createur.tag}`}>
                                                <Avatar className="hidden h-10 w-10 sm:flex">
                                                    <AvatarImage src={`/user/avatar/userAvatar-${post.createur.id}`} alt={post.createur.name} />
                                                    <AvatarFallback>{ post.createur.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                            <div className="flex flex-col w-full">
                                                <div className="grid w-full">
                                                    <Link href={`/profile/${post.createur.tag}`} className="flex relative align-middle justify-between gap-2 font-bold leading-none hover:underline">
                                                        <div className="flex gap-2">
                                                            {post.createur.name}
                                                            <span className="text-sm font-medium text-muted-foreground">@{post.createur.tag}</span>
                                                        </div>
                                                        {auth.user.id === post.createur.id ? (
                                                            <Button variant="ghost" size="icon" className="absolute top-0 right-0" onClick={(e) =>  { e.preventDefault(); openDeleteModal(post.id) }}>
                                                                <Trash className="size-4" />
                                                            </Button>
                                                        ) : null}
                                                    </Link>
                                                    <p className="w-full">{ post.content }</p>

                                                    { post.number_of_images > 0 ? (
                                                        <div className="w-full pr-14 pt-2">
                                                            <Carousel className="w-full">
                                                                <CarouselContent className="-ml-1 w-full">
                                                                    {Array.from({ length: post.number_of_images }).map((_, index) => (
                                                                        <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                                            <div className="p-1">
                                                                                <Card className={`bg-cover bg-center`} style={{"background-image": `url("/posts/attachement/post-${ post.id }_${ index }")`}}>
                                                                                    <CardContent className="flex aspect-square items-center justify-center p-6" />
                                                                                </Card>
                                                                            </div>
                                                                        </CarouselItem>
                                                                    ))}
                                                                </CarouselContent>
                                                                { post.number_of_images > 2 ? (
                                                                    <div>
                                                                        <CarouselPrevious />
                                                                        <CarouselNext />
                                                                    </div>
                                                                ): null }
                                                            </Carousel>
                                                        </div>
                                                    ): null }
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
                    </div>
                </div>
            </div>

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

            <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Suppression du post</DialogTitle>
                        <DialogClose />
                        <p className="text-sm text-muted-foreground">Etes-vous certains de vouloir suprimmer ce post ?</p>
                    </DialogHeader>
                    <form onSubmit={submitDelete} className="flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" size="sm" className="mt-2">
                                Annuler
                            </Button>
                        </DialogClose>
                        <Button type="submit" variant="destructive" size="sm" className="mt-2">
                            Supprimer
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
