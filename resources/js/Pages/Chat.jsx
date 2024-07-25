import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { format } from 'date-fns';
import { Send, Plus } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";

export default function Chat({ auth, chats = [], chat, messages }) {
    console.log(chats, chat, messages);

    const { data, setData, post } = useForm({
        tag: '',
    });

    const { get } = useForm();

    const { data: messageData, setData: setMessageData, post: postMessage, reset } = useForm({
        chat_id: chat?.id || '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('chat.store'), data);
    };

    const handleSubmitMessage = (e) => {
        postMessage(route('message.store', { chatId: messageData.chat_id }), messageData, {
            onSuccess: () => {
                reset('content');
                loadConversation(messageData.chat_id);
            },
        });
    };

    const getInitials = (name) => {
        const parts = name.split(' ');
        const initials = parts.map(part => part[0]).join('');
        return initials;
    };

    const loadConversation = (chatId) => {
        console.log(chatId);
        get(route('chat.show', { id: chatId }));
    };

    return (
        <AppLayout auth={auth}>
            <div className="grid w-full" style={{ height: 'calc(100vh - 60px)' }}>
                <div className="flex flex-col">
                    <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="relative hidden flex-col items-start gap-2 md:flex" x-chunk="dashboard-03-chunk-0">
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
                            <div className="grid w-full items-start gap-2">
                                {chats.length > 0 ? (
                                    chats.map((chat) => (
                                        <fieldset
                                            key={chat.id}
                                            className="flex w-full items-center rounded-lg border p-4 gap-5 cursor-pointer"
                                            onClick={() => loadConversation(chat.id)}
                                        >
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback>{getInitials(auth.user.id === chat.user_id ? chat.participant.name : chat.user.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p>{auth.user.id === chat.user_id ? chat.participant.name : chat.user.name}</p>
                                                    <span className='text-sm'>.</span>
                                                    <p className="text-gray-500">{format(new Date(chat.created_at), 'MMM dd, yyyy')}</p>
                                                </div>
                                                <p className="text-muted-foreground text-sm">Hi, how are you?</p>
                                            </div>
                                        </fieldset>
                                    ))
                                ) : (
                                    <p className='p-2'>Vous n'avez aucune conversation pour le moment.</p>
                                )}
                            </div>
                        </div>
                        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                            {chat ? (
                                <>
                                    <Badge variant="outline" className="absolute left-3 top-3">
                                        {auth.user.id !== chat.user_id ? chat.user.name : chat.participant.name}
                                    </Badge>
                                    <ScrollArea className="max-h-[660px] space-y-4 p-8 flex-1 rounded-md">
                                        <div className="flex flex-col space-y-2">
                                            {messages && messages.map((message) => (
                                                <div key={message.id} className={`p-2 rounded-md max-w-xs ${message.user_id === auth.user.id ? 'self-end bg-white text-black' : 'self-start bg-gray-700 text-white'}`}>
                                                    {message.content}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    <form
                                        className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                                        x-chunk="dashboard-03-chunk-1"
                                        onSubmit={handleSubmitMessage}
                                    >
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0  focus-visible:ring-offset-0"
                                            name="content"
                                            required
                                            value={messageData.content}
                                            onChange={e => setMessageData({ ...messageData, content: e.target.value })}
                                        />
                                        <div className="flex items-center p-3 pt-0">
                                            <Button type="submit" size="sm" className="ml-auto gap-1.5">
                                                Send Message
                                                <Send className="size-3.5" />
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">Sélectionnez une conversation pour commencer à discuter</p>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
