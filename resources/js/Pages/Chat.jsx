import AppLayout from '@/Layouts/AppLayout';

import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
} from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import {
    Tooltip,
    TooltipProvider,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip"


export default function Chat({ auth, posts }) {
    return (
        <AppLayout auth={auth}>

            <div className="grid h-screen w-full">
                <div className="flex flex-col">
                    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                        >
                            <form className="grid w-full items-start gap-2">
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Conversation 1</Label>
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Conversation 2</Label>
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Conversation 3</Label>
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Conversation 4</Label>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                            <Badge variant="outline" className="absolute right-3 top-3">
                                Conversation 2
                            </Badge>
                            <div className="flex-1" />
                            <form
                                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                            >
                                <Label htmlFor="message" className="sr-only">
                                    Message
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here..."
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
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
                                            <TooltipContent side="top">Attach File</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Mic className="size-4" />
                                                    <span className="sr-only">Use Microphone</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">Use Microphone</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                        Send Message
                                        <CornerDownLeft className="size-3.5" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>

        </AppLayout>
    )
}
