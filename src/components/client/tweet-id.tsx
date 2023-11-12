'use client'

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BsBookmark, BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import ProfileAvatar from "@/components/client/profile-avatar"
import ReplyDialog from "@/components/client/reply-dialog"
import LikeButton from "@/components/client/like-button"
import type { TweetProps } from "@/components/client/tweet"
import { useRouter } from "next/navigation"
dayjs.extend(relativeTime)

const TweetId = ({
    tweet,
    likesCount,
    hasLiked,
    repliesCount,
    isReply,
}: TweetProps) => {

    const router = useRouter()

    return (
        <>
            <div
                key={tweet.tweetDetails.id}
                className={`w-full ${isReply ? `pt-3 pb-1` : `py-3`} px-3 flex flex-col gap-3 cursor-pointer`}
            >

                <div className="w-full flex flex-col max-sm:flex-col sm:gap-1 items-start text-[15px]">
                    {isReply ? (
                        <div className="w-full flex space-x-4">
                            <div>
                                <img className='rounded-full w-10 h-10' src={tweet.userProfile.avatarUrl || '/images/next.jpg'} />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex items-start w-full justify-between">
                                    <div className="w-full flex items-start justify-between">
                                        <div className="w-full flex items-center gap-1 max-2xsm:flex-col max-2xsm:items-start"
                                         onClick={() => router.push(`/${tweet.userProfile.username}`)}
                                        >
                                            <div className="font-bold">
                                                {tweet.userProfile.fullName ?? ""}
                                            </div>
                                            <div className="max-2xsm: flex items-center">
                                                <div className="text-gray-500">
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
                                        <BsThreeDots className="text-[#71767B]" />
                                    </div>
                                </div>
                                <div className="text-white text-base w-full">
                                    {tweet.tweetDetails.text}
                                </div>
                                <div className={`flex w-full justify-between text-[#71767B] py-3 px-1 ${!isReply ? `border-b-[0.5px] border-t-[0.5px] border-gray-600` : null}`}>
                                    <div className="flex items-center hover:text-blue-500 cursor-pointer">
                                        <ReplyDialog tweet={tweet} repliesCount={repliesCount} />
                                    </div>
                                    <div className="flex items-center hover:text-green-500 cursor-pointer">
                                        <AiOutlineRetweet />
                                    </div>
                                    <div className="flex items-center hover:text-red-500 cursor-pointer">
                                        <LikeButton
                                            tweetId={tweet.tweetDetails.id!}
                                            likesCount={likesCount}
                                            isUserHasLiked={hasLiked}
                                        />
                                    </div>
                                    <div className="flex items-center hover:text-blue-500 cursor-pointer">
                                        <BsBookmark />
                                    </div>
                                    <div className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
                                        <IoShareOutline />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ProfileAvatar
                                    username={tweet.userProfile.username}
                                    avatarUrl={tweet.userProfile.avatarUrl}
                                    isOnTimeline={true}
                                />
                                <div className="flex flex-col">
                                    <p className="font-bold hover:underline cursor-pointer pr-1"
                                         onClick={() => router.push(`/${tweet.userProfile.username}`)}
                                    >{tweet.userProfile.fullName ?? ""}</p>
                                    <p className="text-gray-500">@{tweet.userProfile.username}</p>

                                </div>
                            </div>
                            <div className="text-gray-500 cursor-pointer max-2xsm:self-start hover:text-primary transition duration-200">
                                <BsThreeDots />
                            </div>
                        </div>
                    )}

                    {!isReply && (
                        <div className="w-full text-base pt-1 pb-2">
                            {tweet.tweetDetails.text}
                        </div>
                    )}


                    {!isReply && (
                        <div className="pb-2 flex items-center text-[#71767B] text-sm">
                            <p>
                                {dayjs(tweet.tweetDetails.createdAt).format('H:M A')}
                            </p>
                            <BsDot />
                            <p>
                                {dayjs(tweet.tweetDetails.createdAt).format('MMM DD, YYYY')}
                            </p>
                        </div>
                    )}

                    {tweet.userProfile.id === tweet.tweetDetails.profileId && !isReply ? (
                        <div className="w-full text-sm py-3 flex items-center gap-4 border-t-[0.5px] border-gray-700 text-[#71767B]">
                            <IoStatsChart />
                            <p>View post engagements</p>
                        </div>
                    ) : null}

                    {!isReply && (
                        <div className={`flex items-center w-full justify-between text-[#71767B] py-3 px-1 border-b-[0.5px] border-t-[0.5px] border-gray-700 text-lg`}>
                            <div className="flex items-center hover:text-blue-500 cursor-pointer">
                                <ReplyDialog tweet={tweet} repliesCount={repliesCount} />
                            </div>
                            <div className="flex items-center hover:text-green-500 cursor-pointer">
                                <AiOutlineRetweet />
                            </div>
                            <div className="flex items-center hover:text-red-500 cursor-pointer">
                                <LikeButton
                                    tweetId={tweet.tweetDetails.id!}
                                    likesCount={likesCount}
                                    isUserHasLiked={hasLiked}
                                />
                            </div>
                            <div className="flex items-center hover:text-blue-500 cursor-pointer">
                                <BsBookmark />
                            </div>
                            <div className="flex items-center text-gray-600 hover:text-blue-500 cursor-pointer">
                                <IoShareOutline />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}

export default TweetId;