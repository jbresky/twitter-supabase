'use client'

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import { Profile, Tweet } from "@/lib/db/schema";
import LikeButton from "./like-button"
import ReplyDialog from "../reply-dialog"

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
  return (
    <>
      <div
        key={tweet.tweetDetails.id}
        className="p-2 sm:p-4 border-b-[0.5px] border-gray-600 flex flex-col gap-4"
      >
        {/* upper box */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-slate-200 rounded-full" />
            {/* <div className="flex flex-col space-y-2 w-[75%]"> */}
            {/* <div className="flex items-start justify-between"> */}

            <div className="flex max-sm:flex-col sm:gap-1 items-start text-[15px]">

              <div className="font-bold hover:underline cursor-pointer">{tweet.userProfile.fullName ?? ""}</div>
              {/* user profile debe estar junto con tiempo */}
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
          </div>
          {/* </div> */}
          <div className="hover:text-blue-500 cursor-pointer self-start">
            <BsThreeDots />
          </div>
          {/* </div> */}
        </div>

        {/* lower box */}
        <div className="flex justify-end">
          <div className="w-[91%] flex flex-col">
            <div className="text-white text-base">
              {tweet.tweetDetails.text}
            </div>
            {/* <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div> */}
            <div className="flex items-center w-full justify-between text-sm text-gray-400 pt-1">
              <div className="flex items-center hover:text-blue-500 cursor-pointer">
                <ReplyDialog tweet={tweet} repliesCount={repliesCount} />
              </div>
              <div className="flex space-x-2 items-center hover:text-green-500 cursor-pointer">
                <AiOutlineRetweet />
                <div>
                  {/* {Math.floor(Math.random() * 1000) + 1} */}
                </div>
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
                <div>
                  {/* {Math.floor(Math.random() * 1000) + 1} */}
                </div>
              </div>
              <div className="flex items-center hover:text-blue-500 cursor-pointer">
                <IoShareOutline />
                <div>
                  {/* {Math.floor(Math.random() * 1000) + 1} */}
                </div>
              </div>
            </div>
          </div>
          {/* lower box */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Tweet;