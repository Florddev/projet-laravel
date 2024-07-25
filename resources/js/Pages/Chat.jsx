import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';

import {
    Send,
    Plus,
} from "lucide-react"

import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Textarea } from "@/Components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

import { Avatar, AvatarFallback } from "@/Components/ui/avatar.tsx";


export default function Chat({ auth, chats }) {
    const { data, setData, post } = useForm({
        tag: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('chat.store'), data);
    };

    const getInitials = (name) => {
        const parts = name.split(' ');
        const initials = parts.map(part => part[0]).join('');
        return initials;
    };

    return (
        <AppLayout auth={auth}>

            <div className="grid w-full" style={{ height: 'calc(100vh - 60px)' }}>
                <div className="flex flex-col">
                    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="relative hidden flex-col items-start gap-2 md:flex" x-chunk="dashboard-03-chunk-0"
                        >
                            <nav className="flex justify-between w-full items-center p-2">
                                <h1 className="text-lg font-semibold md:text-2xl my-4">Messages</h1>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <form onSubmit={handleSubmit}>
                                            <DialogHeader>
                                                <DialogTitle>Créer une conversation</DialogTitle>
                                                <DialogDescription>
                                                    Ajouter la personne que vous souhaitez contacter.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="tag" className="text-right">
                                                        Tag
                                                    </Label>
                                                    <Input id="tag" className="col-span-3" value={data.tag} onChange={(e) => setData('tag', e.target.value)} />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Créer</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </nav>
                            <form className="grid w-full items-start gap-2">
                                {chats.length > 0 ? (
                                    chats.map((chat) => (
                                        <fieldset className="flex w-full items-center rounded-lg border p-4 gap-5">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{getInitials(chat.participant.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p>{chat.participant.name}</p>
                                                    <span className='text-sm'>.</span>
                                                    <p className="text-gray-500">Jan 05, 2022</p>
                                                </div>
                                                <p className="text-muted-foreground text-sm">Hi, how are you?</p>
                                            </div>
                                        </fieldset>
                                    ))
                                ) : (
                                    <p className='p-2'>Vous n'avez aucune conversation pour le moment.</p>
                                )}
                            </form>
                        </div>
                        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                            <Badge variant="outline" className="absolute right-3 top-3">
                                Conversation 2
                            </Badge>
                            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                                {/* Messages */}
                                <div className="flex flex-col space-y-2">
                                    <div className="self-start bg-gray-700 text-white p-2 rounded-md max-w-xs">
                                        Hi, how can I help you today?
                                    </div>
                                    <div className="self-end bg-white text-black p-2 rounded-md max-w-xs">
                                        Hey, I'm having trouble with my account.
                                    </div>
                                    <div className="self-start bg-gray-700 text-white p-2 rounded-md max-w-xs">
                                        What seems to be the problem?
                                    </div>
                                    <div className="self-end bg-white text-black p-2 rounded-md max-w-xs">
                                        I can't log in.
                                    </div>
                                    <div className="self-end bg-white text-black p-2 rounded-md max-w-xs">
                                        Florian ferme ta gueule.
                                    </div>
                                    <div className="self-start bg-gray-700 text-white p-2 rounded-md max-w-xs">
                                        Bernard, je veux faire du sale.
                                    </div>
                                    <div className="self-start bg-gray-700 text-white p-2 rounded-md max-w-xs">
                                        Je veux faire l'amouuuur.
                                    </div>
                                </div>
                            </div>
                            <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1">
                                <Textarea
                                    id="message"
                                    placeholder="Type your message here..."
                                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                                />
                                <div className="flex items-center p-3 pt-0">
                                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                        Send Message
                                        <Send className="size-3.5" />
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
