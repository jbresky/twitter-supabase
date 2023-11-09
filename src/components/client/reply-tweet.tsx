'use client'

import { useState, useTransition } from "react";
import { reply } from "@/lib/supabase/mutation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

// replying tweet on /tweet/id instead on dialog
interface ReplyTweetProps {
    id: string,
    userAvatar: string
}

const ReplyTweet = ({ id, userAvatar }: ReplyTweetProps) => {
    const [replyText, setReplyText] = useState<string>("")
    let [isReplyPending, startTransition] = useTransition();

    const supabase = createPagesBrowserClient();

    return (
        <>
            <div className="w-full flex px-2 pb-4 border-b-[0.5px] border-gray-600">
                <img className='rounded-full w-10 h-10' src={userAvatar || '/images/next.jpg'} />
                <div className='w-full flex flex-col'>
                    <input
                        className="w-full bg-transparent outline-none border-b-[0.5px] border-gray-600 px-4 pb-2 text-xl placeholder:text-xl placeholder:text-gray-600 border-none"
                        placeholder="Post your reply"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="w-full flex justify-end">
                        <button
                            disabled={isReplyPending}
                            onClick={() => {
                                supabase.auth
                                    .getUser()
                                    .then((res) => {
                                        if (res.data && res.data.user) {
                                            const user = res.data.user;
                                            startTransition(() => {
                                                reply({
                                                    replyText,
                                                    tweetId: id,
                                                    userId: user.id,
                                                })
                                                    .then(() => {
                                                        setReplyText("")
                                                        toast.success("Your reply was sent")
                                                    })
                                                    .catch(() => {
                                                        toast.error("something went wrong with db");
                                                    });
                                            });
                                        } else {
                                            toast("please login to reply to a tweet");
                                        }
                                    })
                                    .catch(() => {
                                        toast.error("authentication failed");
                                    });
                            }}
                            className='w-fit flex self-end rounded-full bg-primary px-4 py-2 font-semibold hover:bg-opacity-90 transition duration-200'
                        >
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReplyTweet;