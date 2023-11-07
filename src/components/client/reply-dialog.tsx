'use client'

import React, { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Profile, Tweet } from "@/lib/db/schema";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { reply } from "@/lib/supabase/mutation";

dayjs.extend(relativeTime);

interface ReplyDialogProps {
    tweet: {
        userProfile: Profile,
        tweetDetails: Tweet
    },
    repliesCount: number
}

const ReplyDialog = ({ tweet, repliesCount }: ReplyDialogProps) => {
    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
    const [replyText, setReplyText] = useState<string>("")
    let [isReplyPending, startTransition] = useTransition();

    const supabase = createPagesBrowserClient();

    return (
        <Dialog onOpenChange={setIsReplyDialogOpen} open={isReplyDialogOpen}>
                <DialogTrigger asChild>
                    <button className="rounded-full flex items-center space-x-2 transition duration-200 cursor-pointer">
                        <BsChat />
                        <span className="text-sm">{repliesCount == 0 ? '' : repliesCount}</span>
                    </button>
                </DialogTrigger>
                        <DialogContent className="bg-black max-w-[600px] border-none text-white">
                            <div className="flex flex-col items-start gap-4 pt-3">
                                <div className="flex space-x-4">
                                    <div>
                                        <div className="w-10 h-10 bg-slate-200 rounded-full" />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center w-full justify-between">
                                            <div className="flex items-center w-full">
                                                <div className="font-bold">
                                                    {tweet.userProfile.fullName ?? ""}
                                                </div>
                                                <div className="text-gray-500 pl-2">
                                                    @{tweet.userProfile.username}
                                                </div>
                                                <div className="text-gray-500">
                                                    <BsDot />
                                                </div>
                                                <div className="text-gray-500 text-sm">
                                                    {dayjs(tweet.tweetDetails.createdAt).fromNow(false)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-white text-base w-full mb-3">
                                            {tweet.tweetDetails.text}
                                        </div>
                                        <div className="text-sm text-gray-500">Replying to <span className="text-primary">@{tweet.userProfile.username}</span></div>
                                    </div>
                                </div>
                                <div className="flex w-full items-start gap-4">
                                    <div>
                                        <div className="w-10 h-10 bg-slate-200 rounded-full" />
                                    </div>
                                    <textarea
                                        placeholder="Post your reply"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-[90%] h-full text-xl placeholder:text-gray-600 bg-transparent border-none border-gray-600 outline-none"
                                    />
                                </div>
                                <div className="w-full justify-between items-center flex">
                                    <div></div>
                                    <div className="w-full max-w-[100px]">
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
                                                                    tweetId: tweet.tweetDetails.id!,
                                                                    userId: user.id,
                                                                })
                                                                    .then(() => {
                                                                        setIsReplyDialogOpen(false);
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
                                            className='rounded-full bg-primary px-4 py-2 w-full text-lg font-bold text-center hover:bg-opacity-90 transition duration-200'
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
        </Dialog>
    );
}

export default ReplyDialog;
