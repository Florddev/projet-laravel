import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import {Link, useForm} from '@inertiajs/react'
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu, MessageCircle, MessageSquareText,
    Package,
    Package2,
    Search, Settings,
    ShoppingCart, User,
    Users,
} from "lucide-react"

import { CornerDownLeft, Mic, Paperclip } from "lucide-react"

import { Label } from "@/Components/ui/label.tsx"
import { Textarea } from "@/Components/ui/textarea.tsx"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/Components/ui/tooltip.tsx"

import { Badge } from "@/Components/ui/badge.tsx"
import { Button } from "@/Components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu.tsx"
import { Input } from "@/Components/ui/input.tsx"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet.tsx"
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel.tsx";
import { useToast } from "@/Components/ui/use-toast.ts"
import InputError from "@/Components/InputError.jsx";

export default function Dashboard({ auth, posts }) {
    const { showToast, ToastContainer } = useToast();
    const { data, setData, post, processing, progress, errors, reset } = useForm({
        content: '',
        images: null,
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);

        const filePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(filePreviews);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', data.content);

        if (data.images) {
            Array.from(data.images).forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });
        }

        post(route('posts.store'), {
            data: formData,
            onSuccess: () => {
                reset('content', 'images');
                setImagePreviews([]);
            },
            onError: (errors) => {
                errors.images = Object.values(errors).flat().join('\n');
            }
        });
    };

    return (
        <AppLayout auth={auth}>
            <main className="flex flex-1 justify-between">
                <div className="flex flex-col w-full p-6">
                    {/*<h1 className="text-lg font-semibold md:text-2xl mb-4">Poster un message</h1>*/}
                    <form onSubmit={submit} className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                        <Label htmlFor="message" className="sr-only">Message</Label>
                        <Textarea
                            id="message"
                            value={data.content}
                            placeholder="Type your message here..."
                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => setData('content', e.target.value)}
                        />

                        {imagePreviews.length > 0 && (
                            <div className="w-full px-14 pt-2">
                                <Carousel className="w-full">
                                    <CarouselContent className="-ml-1 w-full">
                                        {imagePreviews.map((src, index) => (
                                            <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                <div className="p-1">
                                                    <Card className="bg-cover bg-center" style={{"background-image": `url(${src})`}} >
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            {/*<span className="text-2xl font-semibold">{index + 1}</span>*/}
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

                        <InputError message={errors.content} />
                        <InputError message={errors.images} />

                        <div className="flex items-center p-3 pt-2">
                            <Input type="file" id="attachements" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" type="button" htmlFor="attachements" asChild>
                                            <Label className="cursor-pointer">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Label>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p>Attach File</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                Send Message
                                <CornerDownLeft className="size-3.5" />
                            </Button>
                        </div>
                        {/*<div className="mt-4">*/}
                        {/*    {imagePreviews.length > 0 && (*/}
                        {/*        <div className="grid grid-cols-3 gap-2">*/}
                        {/*            {imagePreviews.map((src, index) => (*/}
                        {/*                <div key={index} className="relative">*/}
                        {/*                    <img src={src} alt={`Preview ${index}`} className="w-full h-auto rounded-md" />*/}
                        {/*                </div>*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    )}*/}
                        {/*</div>*/}

                    </form>
                    <h1 className="text-lg font-semibold md:text-2xl my-4">Actualités</h1>
                    <div className="flex flex-col gap-4">

                        {posts.map((post, index) => (
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
                                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                                            {/*<span className="text-2xl font-semibold">{index + 1}</span>*/}
                                                                        </CardContent>
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


                        {/*<div className="flex items-center gap-4">*/}
                        {/*    <Avatar className="hidden h-9 w-9 sm:flex">*/}
                        {/*        <AvatarImage src="/avatars/03.png" alt="Avatar" />*/}
                        {/*        <AvatarFallback>{ auth.user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>*/}
                        {/*    </Avatar>*/}
                        {/*    <div className="grid gap-1">*/}
                        {/*        <p className="text-sm font-medium leading-none">{ auth.user.name }</p>*/}
                        {/*        <p className="text-sm text-muted-foreground">{ auth.user.email }</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
