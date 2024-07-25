import React, { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Search } from "lucide-react";
import __ from "@/Components/translate";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/Components/ui/carousel";
import { Card, CardContent } from "@/Components/ui/card";
import { router, Link } from '@inertiajs/react';
import AccountSidebar from "@/Components/AccountSidebar";

// Fonction debounce personnalisée
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default function SearchPage({ postResults = [], userResults = [], search = '', last_followers }) {

    const [searchTerm, setSearchTerm] = useState(search);

    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(route('search', { search: value }), {
                preserveState: true,
                preserveScroll: true,
                only: ['post_result', 'user_result'],
            });
        }, 300),
        []
    );

    useEffect(() => {
        if (searchTerm !== search) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm, search, debouncedSearch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    return (
        <AppLayout current_page="explore">
            <main className="flex flex-1 justify-between w-full">
                <div className="flex flex-col w-full p-6">
                    <div className="flex gap-2 w-full mb-4">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={__('search')}
                                className="w-full appearance-none bg-background pl-8 shadow-none bg-muted/40"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    {userResults.length > 0 && (
                        <h1 className="text-lg font-semibold md:text-2xl my-4">{__('users')}</h1>
                    )}
                    <div className="flex flex-col gap-4">
                        {userResults.map((user, index) => (
                            <div key={index} className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4">
                                <Link href={`/profile/${user.tag}`}>
                                    <Avatar className="hidden h-10 w-10 sm:flex">
                                        <AvatarImage src={`/user/avatar/userAvatar-${ user.id }`} alt={ user.name } />
                                        <AvatarFallback>{user.name.split(' ').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div className="flex flex-col w-full">
                                    <div className="grid w-full">
                                        <Link href={`/profile/${user.tag}`} className="flex align-middle gap-2 font-bold leading-none hover:underline">
                                            {user.name}
                                            <span className="text-sm font-medium text-muted-foreground">@{ user.tag }</span>
                                        </Link>
                                        <p className="w-full">{ user.bio ?? '...' }</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {postResults.length > 0 && (
                        <h1 className="text-lg font-semibold md:text-2xl my-4">{__('posts')}</h1>
                    )}
                    <div className="flex flex-col gap-4">
                        {postResults.map((post, index) => (
                            <Link href={route('posts.show', post.id)} className="flex flex-col gap-2">
                                <div key={index} className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4">
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
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {(postResults?.length === 0 && userResults?.length === 0) && (
                        <p className="text-sm text-muted-foreground">Aucun post ni compte correspondant à la recherche "{searchTerm}" n'a été trouvé...</p>
                    )}
                </div>
                <AccountSidebar data={last_followers}/>
            </main>
        </AppLayout>
    );
}
