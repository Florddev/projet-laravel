import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AccountSidebar from '@/Components/AccountSidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";
import {Card, CardContent} from "@/Components/ui/card";
import {Separator} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/Components/ui/button";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/Components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea.tsx";
import InputError from "@/Components/InputError.jsx";

export default function Account({ auth, user, posts, isFollowing }) {
    const { post } = useForm();
    const { data: replyData, setData: setReplyData, post: createReply, processing: replyProcessing, errors: replyErrors, reset: resetReplyForm } = useForm({
        replyContent: '',
    });
    const [bannerLoaded, setBannerLoaded] = useState(true);
    const [following, setFollowing] = useState(isFollowing);
    const [showReplyModal, setShowReplyModal] = useState(false);
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

    const openReplyModal = (postId) => {
        setCurrentPostId(postId);
        setShowReplyModal(true);
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
                                                Se désabonner
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleFollow}
                                                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
                                            >
                                                Suivre
                                            </button>
                                        )
                                    ) : (
                                        <Link href="/settings" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
                                            Modifier le profil
                                        </Link>
                                    )}
                                </div>
                                <p className="text-gray-400">@{user.tag}</p>
                                <p className="my-4">{user.bio}</p>
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                                    <span className="flex items-center"><span className="mr-1">🗓</span>Inscrit depuis le {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-sm">
                                    <span><strong>{user.followings_count}</strong> abonnements</span>
                                    <span><strong>{user.followers_count}</strong> abonnés</span>
                                </div>
                            </main>

                            <div className="flex flex-col gap-4 p-4 pt-12">
                                {posts.map((post, index) => (
                                    <Link href={route('posts.show', post.id)} className="flex flex-col gap-2">
                                        <div className="flex flex-1 justify-between gap-3 border p-4 rounded-md">
                                            <Avatar className="hidden h-10 w-10 sm:flex">
                                                <AvatarImage src={`/user/avatar/userAvatar-${post.createur.id}`} alt={post.createur.name} />
                                                <AvatarFallback>{ post.createur.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col w-full">
                                                <div className="grid w-full">
                                                    <p className="flex align-middle gap-2 font-bold leading-none">
                                                        { post.createur.name }
                                                        <span className="text-sm font-medium text-muted-foreground">@{ post.createur.tag }</span>
                                                    </p>
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
                        <aside className="mt-8 md:mt-0 w-full md:w-96">
                            <AccountSidebar />
                        </aside>
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
        </AppLayout>
    )
}
