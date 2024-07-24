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
import __, { changeLanguage } from "@/Components/translate.jsx";

export default function Dashboard() {
    return (
        <AppLayout current_page="explore">
            <main className="flex flex-1 justify-between">
                <div className="flex flex-col w-full p-6">
                    hey
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
