import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTweets } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import { BsArrowLeft } from 'react-icons/bs'
import Tweet from "../tweet";

const TweetPage = async ({ params }: { params: { id: string } }) => {
  const supabaseClient = createServerComponentClient({
    cookies,
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();

  const tweet = await getTweets({
    currentUserID: userData.user?.id,
    getSingleTweetId: params.id,
  });

  if (!tweet) {
    redirect("/");
  }

  const repliesRes = await getTweets({
    currentUserID: userData.user?.id,
    orderBy: true,
    replyId: tweet[0].tweet.id,
  });

  return (
    <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <div className="flex items-center py-3 px-3 gap-8">
        <BsArrowLeft className="text-2xl" />
        <h1 className="text-xl font-semibold">Post</h1>
      </div>
      {tweet ? (
        <Tweet
          hasLiked={Boolean(tweet[0].hasLiked)}
          likesCount={tweet[0].likes.length ?? 0}
          tweet={{
            tweetDetails: tweet[0].tweet,
            userProfile: tweet[0].profile,
          }}
          currentUserId={userData.user?.id}
          repliesCount={tweet[0].replies.length}
        />
      ) : (
        <div>no tweet found</div>
      )}
      {repliesRes &&
        repliesRes.map(({ hasLiked, likes, profile, replies, tweet }) => {
          return (
            <Tweet
              key={tweet.id}
              hasLiked={hasLiked}
              likesCount={likes.length}
              tweet={{
                tweetDetails: tweet,
                userProfile: profile,
              }}
              repliesCount={replies.length}
              currentUserId={userData.user?.id}
            />
          );
        })}
    </main>
  );
};

export default TweetPage;