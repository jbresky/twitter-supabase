'use client'

import { likeTweet, unlikeTweet } from "@/lib/supabase/mutation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

interface LikeButtonProps {
    tweetId: string,
    likesCount: number | null,
    isUserHasLiked: boolean
}

const LikeButton = ({
    tweetId,
    likesCount,
    isUserHasLiked
}: LikeButtonProps) => {
    let [isLikePending, startTransition] = useTransition()
    const supabase = createPagesBrowserClient()
    return (
        <button
            disabled={isLikePending}
            onClick={() => {
                supabase.auth
                    .getUser()
                    .then((res) => {
                        if (res.data && res.data.user) {
                            const user = res.data.user;
                            startTransition(() =>
                                isUserHasLiked
                                    ? unlikeTweet({
                                        tweetId,
                                        userId: user.id,
                                    })
                                    : likeTweet({
                                        tweetId,
                                        userId: user.id,
                                    })
                            );
                        } else {
                            toast("please login to like a tweet");
                        }
                    })
                    .catch(() => {
                        toast.error("authentication failed");
                    });
            }}
            className="rounded-full flex items-center space-x-2 transition duration-200 p-3 cursor-pointer"
        >
            {isUserHasLiked ? (
                <AiFillHeart className="w-5 h-5 text-red-600" />
            ) : (
                <AiOutlineHeart className="w-5 h-5" />
            )}
            <span>{likesCount == 0 ? '' : likesCount}</span>
        </button>
    );
}

export default LikeButton;