import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AccountSidebar from '@/Components/AccountSidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/Components/ui/avatar';

export default function Account({ auth, user, posts }) {
    return (
        <AppLayout auth={auth}>
            <Head title="Profile" />
            <div className="bg-black text-white min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex-grow max-w-4xl">
                            <header className="relative mb-16">
                                <img src="https://lareclame.fr/wp-content/uploads/2024/05/psg-top.jpg" alt="Cover" className="w-full h-48 object-cover" />
                                <div className="absolute -bottom-16 left-4">
                                    <img src="https://pbs.twimg.com/profile_images/1766432919273234432/8ST546w0_400x400.png" alt={auth.user.name} className="w-32 h-32 rounded-full border-4 border-black" />
                                </div>
                            </header>
                            <main className="mt-20 px-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-bold">{auth.user.name}</h1>
                                    { auth.user.tag === user.tag ? (
                                        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">Modifier le profil</button>
                                    ) : (
                                        <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">Suivre</button>
                                    ) }
                                </div>
                                <p className="text-gray-400">@{auth.user.tag}</p>
                                <p className="my-4">User bio</p>
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                                    <span className="flex items-center"><span className="mr-1">📍</span>User location</span>
                                    <span className="flex items-center"><span className="mr-1">🌐</span>User website</span>
                                    <span className="flex items-center"><span className="mr-1">🗓</span>Inscrit en {new Date(auth.user.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-sm">
                                    <span><strong>40</strong> abonnements</span>
                                    <span><strong>400</strong> abonnés</span>
                                </div>
                            </main>
                            <nav className="mt-8">
                                <ul className="flex">
                                    {['Posts', 'Réponses', 'Médias', 'J\'aime'].map((item) => (
                                        <li key={item} className="px-4 py-2 hover:bg-gray-900 cursor-pointer transition">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div>
                                {posts.map((post, index) => (
                                    <div className="flex flex-1 justify-between gap-3 border p-4">
                                        <Avatar className="hidden h-10 w-10 sm:flex">
                                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
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
                                                                            <Card className={`bg-cover bg-center`} style={{"background-image": `url("/posts/attachement/post-${ post.id }_${ index }.webp")`}}>
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
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <aside className="mt-8 md:mt-0 w-full md:w-96">
                            <AccountSidebar />
                        </aside>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}