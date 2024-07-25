import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import {Button} from "@/Components/ui/button";
import {
    Bell, CircleUser,
    Home, LineChart,
    Menu,
    MessageSquareText,
    Package,
    Package2,
    Search,
    PlusCircle,
    Settings,
    ShoppingCart,
    User, Users, UserRound,
    Languages,
    Check, LogOut, Settings2
} from "lucide-react";
import {Badge} from "@/Components/ui/badge";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import {Sheet, SheetContent, SheetTrigger} from "@/Components/ui/sheet";
import {Input} from "@/Components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubTrigger,
    DropdownMenuTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuSub
} from "@/Components/ui/dropdown-menu";
import __, {changeLanguage} from "@/Components/translate.jsx";

export default function App({ current_page, children }) {

    const auth = usePage().props.auth;

    const navLinksClass = (active = false) => {
        return `flex items-center gap-3 rounded-lg px-3 py-2 ` + (active ? `bg-muted transition-all text-primary` : `text-muted-foreground transition-all`) + ` hover:text-primary`;
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex sticky top-0 h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            {/*<Package2 className="h-6 w-6" />*/}
                            <span className="">OnlyFun</span>
                        </Link>
                        {/*
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                        */}
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link href={ route('home') } className={navLinksClass(current_page === 'home')}>
                                <Home className="h-4 w-4" />
                                { __('home') }
                            </Link>
                            <Link href={ route('search') } className={navLinksClass(current_page === 'explore')}>
                                <Search className="h-4 w-4" />
                                { __('explore') }
                            </Link>
                            <Link href="#" className={navLinksClass(current_page === 'messages')}>
                                <MessageSquareText className="h-4 w-4" />
                                { __('messages') }
                            </Link>
                            <Link href={`/profile/${auth.user.tag}`} className={navLinksClass(current_page === 'profile')}>
                                <User className="h-4 w-4" />
                                { __('profile') }
                            </Link>
                            <Link href="/settings" className={navLinksClass(current_page === 'settings')}>
                                <Settings className="h-4 w-4" />
                                { __('settings') }
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
                                <AvatarImage src={`/user/avatar/userAvatar-${ auth.user.id }`} alt={ auth.user.name } />
                                <AvatarFallback>{ auth.user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{ auth.user.name }</p>
                                <p className="text-sm text-muted-foreground">@{ auth.user.tag }</p>
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
                            <nav className="grid gap-2 text-lg font-medium pt-8">
                                <Link href={ route('home') } className={navLinksClass(current_page === 'home')}>
                                    <Home className="h-4 w-4" />
                                    { __('home') }
                                </Link>
                                <Link href={ route('search') } className={navLinksClass(current_page === 'explore')}>
                                    <Search className="h-4 w-4" />
                                    { __('explore') }
                                </Link>
                                <Link href="#" className={navLinksClass(current_page === 'messages')}>
                                    <MessageSquareText className="h-4 w-4" />
                                    { __('messages') }
                                </Link>
                                <Link href={`/profile/${auth.user.tag}`} className={navLinksClass(current_page === 'profile')}>
                                    <User className="h-4 w-4" />
                                    { __('profile') }
                                </Link>
                                <Link href="/settings" className={navLinksClass(current_page === 'settings')}>
                                    <Settings className="h-4 w-4" />
                                    { __('settings') }
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
                                        <AvatarImage src={`/user/avatar/userAvatar-${ auth.user.id }`} alt="Avatar" />
                                        <AvatarFallback>{ auth.user.name.split(' ').map(word => word[0].toUpperCase()).join('') }</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">{ auth.user.name }</p>
                                        <p className="text-sm text-muted-foreground">@{ auth.user.tag }</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        {/*
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder={ __('search') }
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                        */}
                    </div>
                    <div className="flex gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Languages className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{ __('change_language') }</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => changeLanguage('fr')}>
                                    {/* <Check className="mr-2 h-4 w-4"/> */}
                                    <span>{ __('french') }</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                                    {/* <Check className="mr-2 h-4 w-4"/> */}
                                    <span>{ __('english') }</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary">
                                    {auth.user.name}
                                    <CircleUser size="icon" className="rounded-full h-5 w-5 ml-2" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>{ __('my_account') }</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.show', { tag: auth.user.tag })} method="get" className="w-full cursor-pointer">
                                        <UserRound className="mr-2 h-4 w-4" />
                                        { __('my_profile') }
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')} method="get" className="w-full cursor-pointer">
                                        <Settings2 className="mr-2 h-4 w-4" />
                                        { __('edit_account') }
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('logout')} method="post" className="w-full cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        { __('logout') }
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                { children }
            </div>
        </div>
    );
}
