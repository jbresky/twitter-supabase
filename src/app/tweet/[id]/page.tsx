import { getTweets } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { BsArrowLeft } from 'react-icons/bs'
import TweetId from "@/components/client/tweet-id";
import RightSection from "@/components/right-section";
import LeftSidebar from "@/components/left-sidebar";
import ReplyTweet from "@/components/client/reply-tweet";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Toaster } from "sonner";

const TweetPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const { data: userData } = await supabase.auth.getUser();

  const tweet = await getTweets({
    currentUserID: userData.user?.id,
    getSingleTweetId: params.id,
  });

  if (!tweet) {
    redirect("/login");
  }

  const repliesRes = await getTweets({
    currentUserID: userData.user?.id,
    orderBy: true,
    replyId: tweet[0].tweet.id,
  });

  return (
    <>
      <Toaster />
      <LeftSidebar session={session} />
      <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <div className="flex items-center py-3 px-3 gap-8">
          <BsArrowLeft className="text-2xl" />
          <h1 className="text-xl font-semibold">Post</h1>
        </div>

        {tweet ? (
          <>
            <TweetId
              hasLiked={Boolean(tweet[0].hasLiked)}
              likesCount={tweet[0].likes.length ?? 0}
              tweet={{
                tweetDetails: tweet[0].tweet,
                userProfile: tweet[0].profile,
              }}
              currentUserId={userData.user?.id}
              repliesCount={tweet[0].replies.length}
            />
            <ReplyTweet id={params.id} userAvatar={session?.user.user_metadata.avatar_url} />
          </>
        ) : (
          <div>no tweet found</div>
        )}

        {repliesRes &&
          repliesRes.map(({ hasLiked, likes, profile, replies, tweet }) => {
            return (
              <TweetId
                key={tweet.id}
                hasLiked={hasLiked}
                likesCount={likes.length}
                tweet={{
                  tweetDetails: tweet,
                  userProfile: profile,
                }}
                repliesCount={replies.length}
                currentUserId={userData.user?.id}
                isReply={true}
              />
            );
          })}
      </main>
      <RightSection />
    </>
  );
};

export default TweetPage;