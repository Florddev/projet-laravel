import { Button } from "@/Components/ui/button";
import __ from "@/Components/translate";
import {Link} from "@inertiajs/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar";
import React from "react";

export default function AccountSidebar({ data }) {
    return (
        <div className="hidden max-w-96 sticky top-0 max-h-screen flex-1 border-l p-6 md:flex md:min-w-60 lg:min-w-80 2xl:min-w-96">
            <div className="flex flex-col gap-1 h-fit w-full">
                <h2 className="text-lg font-semibold md:text-2xl my-4">{ __('last_followers') }</h2>
                {data.map((follow, index) => (
                    <div key={index} className="flex flex-1 justify-between gap-3 border rounded-lg roude p-4 h-fit w-full">
                        <Link href={`/profile/${follow.user.tag}`}>
                            <Avatar className="hidden h-10 w-10 sm:flex">
                                <AvatarImage src={`/user/avatar/userAvatar-${ follow.user.id }`} alt={ follow.user.name } />
                                <AvatarFallback>{follow.user.name.split(' ').map(word => word[0].toUpperCase()).join('')}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="flex flex-col w-full">
                            <div className="grid w-full">
                                <Link href={`/profile/${follow.user.tag}`} className="flex align-middle gap-2 font-bold leading-none hover:underline">
                                    {follow.user.name}
                                    <span className="text-sm font-medium text-muted-foreground">@{ follow.user.tag }</span>
                                </Link>
                                <p className="w-full">{ follow.user.bio ?? __('new_user_message') }</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
