'use client'

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import { Profile, Tweet } from "@/lib/db/schema";
import LikeButton from "./like-button"
import { useRouter } from "next/navigation"
import ProfileAvatar from "./profile-avatar"
import ReplyDialog from "./reply-dialog"

dayjs.extend(relativeTime)

type TweetProps = {
  tweet: {
    userProfile: Profile;
    tweetDetails: Tweet
  };
  currentUserId?: string;
  likesCount: number;
  hasLiked: boolean;
  repliesCount: number;
}

const Tweet = ({
  tweet,
  likesCount,
  hasLiked,
  repliesCount,
}: TweetProps) => {

  const router = useRouter()
  return (
    <>
      <div
        key={tweet.tweetDetails.id}
        className="w-full py-3 px-3 border-b-[0.5px] border-gray-600 flex gap-3 cursor-pointer"
      >
        <div>
          {/* <div className="w-10 h-10 bg-slate-200 rounded-full" /> */}
          <ProfileAvatar
            username={tweet.userProfile.username}
            avatarUrl={tweet.userProfile.avatarUrl}
            isOnTimeline={true}
          />
        </div>

        <div className="w-full flex flex-col max-sm:flex-col sm:gap-1 items-start text-[15px]">

          <div className="w-full flex items-center justify-between">

            <div
            onClick={() => router.push(`/${tweet.userProfile.username}`)}
            className="flex items-center max-2xsm:flex-col max-sm:items-start">
              <p className="font-bold hover:underline cursor-pointer pr-1">{tweet.userProfile.fullName ?? ""}</p>
              <div className="flex items-center">
                <p className="text-gray-500">@{tweet.userProfile.username}</p>
                <p className="text-gray-500">
                  <BsDot />
                </p>
                <p className="text-gray-500">
                  {dayjs(tweet.tweetDetails.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <div className="hover:text-blue-500 cursor-pointer max-2xsm:self-start">
              <BsThreeDots />
            </div>
          </div>

          <div className="w-full text-base"
            onClick={() => {
              router.push(`/tweet/${tweet.tweetDetails.id}`)
            }}
          >
            {tweet.tweetDetails.text}
          </div>

          <div className="flex items-center w-full justify-between text-gray-400 py-1">
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
              <IoStatsChart />
            </div>
            <div className="flex items-center text-gray-500 hover:text-blue-500 cursor-pointer">
              <IoShareOutline />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Tweet;