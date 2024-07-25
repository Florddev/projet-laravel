import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeft, Search,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import __ from "@/Components/translate";
import {Input} from "@/Components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";
import {Card, CardContent} from "@/Components/ui/card";

export default function SearchPage({ post_result, user_result, search }) {
    return (
        <AppLayout current_page="explore">
            <main className="flex flex-1 justify-between w-full">
                <div className="flex flex-col w-full p-6">
                    <div className="flex gap-2 w-full mb-4">
                        {/*
                        <Button variant="ghost" size="icon">
                            <ArrowLeft></ArrowLeft>
                        </Button>
                         */}
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={ __('search') }
                                className="w-full appearance-none bg-background pl-8 shadow-none bg-muted/40"
                            />
                        </div>
                    </div>

                    {user_result.length === 0 ?? (
                        <h1 className="text-lg font-semibold md:text-2xl my-4">{ __('users') }</h1>
                    )}
                    <div className="flex flex-col gap-4">
                        {user_result.map((user, index) => (
                            <div className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4">
                                <Avatar className="hidden h-10 w-10 sm:flex">
                                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                    <AvatarFallback>{ user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col w-full">
                                    <div className="grid w-full">
                                        <p className="flex align-middle gap-2 font-bold leading-none">
                                            { user.name }
                                            <span className="text-sm font-medium text-muted-foreground">{ user.email }</span>
                                        </p>
                                        <p className="w-full">Bio de l'utilisateur</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {post_result.length > 0 ?? (
                        <h1 className="text-lg font-semibold md:text-2xl my-4">{ __('users') }</h1>
                    )}
                    <div className="flex flex-col gap-4">
                        {post_result.map((post, index) => (
                            <div className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4">
                                <Avatar className="hidden h-10 w-10 sm:flex">
                                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                    <AvatarFallback>{ post.createur.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col w-full">
                                    <div className="grid w-full">
                                        <p className="flex align-middle gap-2 font-bold leading-none">
                                            { post.createur.name }
                                            <span className="text-sm font-medium text-muted-foreground">{ post.createur.email }</span>
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
                <div className="hidden sticky top-0 max-h-screen flex-1 items-center justify-center border-l p-6 md:flex md:min-w-60 lg:min-w-80 2xl:min-w-96">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no products
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            You can start selling as soon as you add a product.
                        </p>
                        <Button className="mt-4">Add Product</Button>
                    </div>
                </div>
            </main>
        </AppLayout>
    )
}
