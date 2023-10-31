import ComposeTweet from "./server/compose-tweet"

import { getTweets } from "@/lib/supabase/queries"
import Tweet from "./client/tweet";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Feed = async () => {
  const supabaseClient = createServerComponentClient({
    cookies
  })

  const { data: userData, error: userError } = await supabaseClient.auth.getUser()

  const res = await getTweets({ currentUserID: userData.user?.id })


  return (
    <main className="flex w-full max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0">Home</h1>
      <div className="border-t-[0.5px] border-b-[0.5px] px-4 flex items-stretch py-4 space-x-2 border-gray-600 relative">
        <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
        <ComposeTweet />
      </div>
      <div className="flex flex-col">
        {res &&
          res.map(({ likes, profile, tweet, hasLiked, replies }) => {
            return (
              <Tweet
                key={tweet.id}
                tweet={{
                  tweetDetails: {
                    ...tweet,
                  },
                  userProfile: {
                    ...profile,
                  },
                }}
                likesCount={likes.length}
                currentUserId={userData.user?.id}
                hasLiked={hasLiked}
                repliesCount={replies.length}
              />
            )
          })}
      </div>
    </main>
  );
}

export default Feed;