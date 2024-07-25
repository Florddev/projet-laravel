import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeft, Search,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import __ from "@/Components/translate";
import {Input} from "@/Components/ui/input";

export default function Explore({ post_result, user_result }) {
    return (
        <AppLayout current_page="explore">
            <main className="flex flex-1 justify-between w-full">
                <div className="flex flex-col w-full p-6">
                    <div className="flex gap-2 w-full">
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
