import { Link } from '@inertiajs/react'
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

import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/Components/ui/tooltip"

import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/Components/ui/carousel";

export default function Dashboard({ auth }) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            {/*<Package2 className="h-6 w-6" />*/}
                            <span className="">OnlyFun</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all text-primary hover:text-primary">
                                <Home className="h-4 w-4" />
                                Home
                            </Link>
                            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Search className="h-4 w-4" />
                                Explore
                            </Link>
                            <Link href="#" className="flex items-center gap-3 rounded-lg text-muted-foreground px-3 py-2 transition-all hover:text-primary">
                                <Bell className="h-4 w-4" />
                                Notifications
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <MessageSquareText className="h-4 w-4" />
                                Message
                            </Link>
                            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <User className="h-4 w-4" />
                                Profil
                            </Link>
                            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                                <Settings className="h-4 w-4" />
                                Paramètres
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        {/*<Card x-chunk="dashboard-02-chunk-0">*/}
                        {/*    <CardHeader className="p-2 pt-0 md:p-4">*/}
                        {/*        <CardTitle>Upgrade to Pro</CardTitle>*/}
                        {/*        <CardDescription>*/}
                        {/*            Unlock all features and get unlimited access to our support*/}
                        {/*            team.*/}
                        {/*        </CardDescription>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">*/}
                        {/*        <Button size="sm" className="w-full">*/}
                        {/*            Upgrade*/}
                        {/*        </Button>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                        <div className="flex items-center gap-4">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                <AvatarFallback>{ auth.user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{ auth.user.name }</p>
                                <p className="text-sm text-muted-foreground">{ auth.user.email }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Users className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                {/*<Card>*/}
                                {/*    <CardHeader>*/}
                                {/*        <CardTitle>Upgrade to Pro</CardTitle>*/}
                                {/*        <CardDescription>*/}
                                {/*            Unlock all features and get unlimited access to our*/}
                                {/*            support team.*/}
                                {/*        </CardDescription>*/}
                                {/*    </CardHeader>*/}
                                {/*    <CardContent>*/}
                                {/*        <Button size="sm" className="w-full">*/}
                                {/*            Upgrade*/}
                                {/*        </Button>*/}
                                {/*    </CardContent>*/}
                                {/*</Card>*/}
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                        <AvatarFallback>IN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                        <p className="text-sm text-muted-foreground">
                                            isabella.nguyen@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$299.00</div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary">
                                {auth.user.name}
                                <CircleUser size="icon" className="rounded-full h-5 w-5 ml-2" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={route('profile.edit')} method="get" className="w-full cursor-pointer">
                                <DropdownMenuItem>
                                    Profil
                                </DropdownMenuItem>
                            </Link>
                            <Link href={route('logout')} method="post" className="w-full cursor-pointer">
                                <DropdownMenuItem>
                                    Logout
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                {/*<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">*/}
                {/*    <div className="flex items-center">*/}
                {/*        <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>*/}
                {/*    </div>*/}
                {/*    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">*/}
                {/*        <div className="flex flex-col items-center gap-1 text-center">*/}
                {/*            <h3 className="text-2xl font-bold tracking-tight">*/}
                {/*                You have no products*/}
                {/*            </h3>*/}
                {/*            <p className="text-sm text-muted-foreground">*/}
                {/*                You can start selling as soon as you add a product.*/}
                {/*            </p>*/}
                {/*            <Button className="mt-4">Add Product</Button>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</main>*/}
                <main className="flex flex-1 justify-between">
                    <div className="flex flex-col w-full p-6">
                        <h1 className="text-lg font-semibold md:text-2xl mb-4">Poster un message</h1>
                        <form className="relative w-full overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <div className="flex items-center p-3 pt-0">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p>Attach File</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Mic className="size-4" />
                                                <span className="sr-only">Use Microphone</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            <p>Use Microphone</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                    Send Message
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                        <h1 className="text-lg font-semibold md:text-2xl my-4">Actualités</h1>
                        <div>

                            <div className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4">
                                <Avatar className="hidden h-10 w-10 sm:flex">
                                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                    <AvatarFallback>{ auth.user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="grid">
                                        <p className="flex align-middle gap-2 font-bold leading-none">
                                            { auth.user.name }
                                            <span className="text-sm font-medium text-muted-foreground">{ auth.user.email }</span>
                                        </p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad assumenda commodi cum delectus error esse illum, nemo nesciunt nihil numquam odit quod quos repellendus ut voluptates! Accusantium ipsum sapiente vel?</p>

                                        <div className="w-full px-12 py-4">
                                            <Carousel className="w-full">
                                                <CarouselContent className="-ml-1 w-full">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <CarouselItem key={index} className="pl-1 lg:basis-1/2">
                                                            <div className="p-1">
                                                                <Card>
                                                                    <CardContent className="flex aspect-video items-center justify-center p-6 md:aspect-square">
                                                                        <span className="text-2xl font-semibold">{index + 1}</span>
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious />
                                                <CarouselNext />
                                            </Carousel>
                                        </div>

                                    </div>
                                </div>
                            </div>

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
                    <div className="hidden flex-1 items-center justify-center border-l p-6 md:flex md:min-w-60 lg:min-w-96">
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
            </div>
        </div>
    )
}
