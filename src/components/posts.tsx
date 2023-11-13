'use client'

import { Session } from "@supabase/supabase-js";
import MobileHeader from "./client/mobile-header";
import Tweet from "./client/tweet";

interface IPosts {
    posts: any,
    session: Session
}

const Posts = ({ posts, session }: IPosts) => {
    return (
        <>
        <MobileHeader session={session}/>
            <div className="flex flex-col">
                {
                    posts?.map((post: any) => {
                        const {
                            likes,
                            profile,
                            tweet,
                            hasLiked,
                            replies
                        } = post

                        return (
                            <Tweet
                                key={tweet.id}
                                tweet={{
                                    tweetDetails: {
                                        ...tweet
                                    },
                                    userProfile: {
                                        ...profile
                                    }
                                }}
                                likesCount={likes.length}
                                hasLiked={hasLiked}
                                repliesCount={replies.length}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}

export default Posts;