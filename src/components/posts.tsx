'use client'

import { AiOutlineSetting } from "react-icons/ai";
import Tweet from "./client/tweet";

interface IPosts {
    posts: any,
    userAvatar: string
}

const Posts = ({ posts, userAvatar }: IPosts) => {
    return (
        <>
            {/* mobile header */}
            <header className="w-full flex flex-col xsm:hidden border-b-1 border-gray-500 pt-2 z-10">
                <div className="flex justify-between items-center px-3">
                    <div className="flex items-center">
                        <img className='rounded-full w-8 h-8' src={userAvatar || '/images/next.jpg'} />
                        <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0 z-10 max-2xsm:hidden">Home</h1>
                    </div>
                <AiOutlineSetting className="w-10 h-6" />
                </div>
                <div className="flex justify-around mt-4">
                    <div className="h-10 flex flex-col gap-[14px]">
                        <h2 className="font-semibold text-[#e7e9ea]">For you</h2>
                        <div className='w-full rounded-xl border-b-8-primary h-[12px] bg-primary'></div>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-[#71767b]">Following</h2>
                    </div>
                </div>
                {/* <div className="w-full text-center py-3 border-t-[0.5px] border-gray-700">
                    <span className="text-primary">Show 220 posts</span>
                </div> */}
            </header>
            {/* mobile header */}

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