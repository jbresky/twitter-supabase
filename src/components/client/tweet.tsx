import { TweetType } from "@/lib/supabase/getTweets";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"

dayjs.extend(relativeTime)

type TweetProps = {
    tweet: TweetType
}

const Tweet = ({ tweet }: TweetProps) => {
    return (
        <div
        key={tweet.id}
        className="p-4 border-b-[0.5px] border-gray-600 flex space-x-4"
      >
        <div>
          <div className="w-10 h-10 bg-slate-200 rounded-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <div className="flex items-center space-x-1 w-full">
              <div className="font-bold hover:underline cursor-pointer">{tweet.profiles.full_name ?? ""}</div>
              <div className="text-gray-500">@{tweet.profiles.username}</div>
              <div className="text-gray-500">
                <BsDot />
              </div>
              <div className="text-gray-500">
                {dayjs(tweet.created_at).fromNow()}
              </div>
            </div>
            <div className="hover:text-blue-500 cursor-pointer">
              <BsThreeDots />
            </div>
          </div>
          <div className="text-white text-base">
            {tweet.text}
          </div>
          <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
          <div className="flex items-center w-full justify-between text-sm text-gray-400 pt-1">
            <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
              <BsChat />
              <div>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
            </div>
            <div className="flex space-x-2 items-center hover:text-green-500 cursor-pointer">
              <AiOutlineRetweet />
              <div>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
            </div>
            <div className="flex space-x-2 items-center hover:text-red-500 cursor-pointer">
              <AiOutlineHeart />
              <div>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
            </div>
            <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
              <IoStatsChart />
              <div>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
            </div>
            <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
              <IoShareOutline />
              <div>
                {Math.floor(Math.random() * 1000) + 1}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Tweet;