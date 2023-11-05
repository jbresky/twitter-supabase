import ProfileAvatar from "@/components/client/profile-avatar";
import Tweet from "@/components/client/tweet";
import { getTweets } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import React from "react";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const supabaseClient = createServerComponentClient({
    cookies,
  });

  const { data: userData, error: userError } =
    await supabaseClient.auth.getUser();

  const getUserTweets = await getTweets({
    currentUserID: userData.user?.id,
    profileUsername: params.username,
  });

  return (
    <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
      <div className="flex flex-col font-bold p-6 backdrop-blur bg-black/10 sticky top-0">
        <ProfileAvatar
          username={params.username}
          avatarUrl={getUserTweets ? getUserTweets[0].profile.avatarUrl : null}
        />
        <h1 className="text-lg">
          {userData.user?.user_metadata?.username || "Profile"}
        </h1>
        <div className="text-xs text-gray-400">
          {getUserTweets?.length || 0} Tweets
        </div>
      </div>
      <div className="w-full">
        {getUserTweets &&
          getUserTweets.map(({ likes, tweet, profile, hasLiked, replies }) => {
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
            );
          })}
      </div>
    </main>
  );
};

export default UserProfilePage;