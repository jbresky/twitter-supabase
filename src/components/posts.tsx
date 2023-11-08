'use client'

import { AiOutlineSetting } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import Tweet from "./client/tweet";

interface IPosts {
    posts: any,
    userAvatar: string
}

const Posts = ({ posts, userAvatar }: IPosts) => {
    return (
        <>
            {/* mobile header */}
            <header className="w-full flex flex-col md:hidden border-b-1 border-gray-500 pt-4 z-10">
                <div className="flex justify-between items-center px-4">
                    <img className='rounded-full w-10 h-10' src={userAvatar || '/images/next.jpg'} />
                    <RiTwitterXFill className="w-10 h-6" />
                    <AiOutlineSetting className="w-10 h-6" />
                </div>
                <div className="flex mx-auto gap-12 mt-4">
                    <div className="h-10 flex flex-col gap-[14px]">
                        <h2 className="font-semibold text-[#e7e9ea]">For you</h2>
                        <div className='w-full rounded-xl border-b-8-primary h-[6px] bg-primary'></div>
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-[#71767b]">Following</h2>
                    </div>
                </div>
                <div className="w-full text-center py-4 border-t-[0.5px] border-[#71767b]">
                    <span className="text-primary">Show 220 posts</span>
                </div>
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