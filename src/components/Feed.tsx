import ComposeTweet from "./server/compose-tweet"
import Tweet from "./client/tweet";
import AuthModal from "./client/login-modal";
import { getTweets } from "@/lib/supabase/queries"
import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { RiTwitterXFill } from 'react-icons/ri'
import { AiOutlineSetting } from 'react-icons/ai'

const Feed = async ({session}: {session: Session}) => {
  const supabaseClient = createServerComponentClient({
    cookies
  })

  const { data: userData, error: userError } = await supabaseClient.auth.getUser()

  const res = await getTweets({ currentUserID: userData.user?.id })

  return (
    <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      {/* mobile header */}
      <header className="h-14 w-full flex justify-between items-center md:hidden border-b-1 border-gray-500 p-4">
        <div className="w-8 h-8 bg-slate-200 rounded-full" />
        <RiTwitterXFill className="text-2xl" />
        <AiOutlineSetting className="text-xl" />
      </header>
      {/* mobile header */}

      <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0">Home</h1>
      <div className="border-t-[0.5px] border-b-[0.5px] px-4 flex items-stretch py-4 space-x-2 border-gray-600 relative">
        {session ? (
          <>
            <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
            <ComposeTweet />
          </>
        ) : (
          <div className="flex items-center justify-end gap-8 w-full">
            <h1>Login to tweet</h1>
            <div>
              <AuthModal />
            </div>
          </div>
        )}
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