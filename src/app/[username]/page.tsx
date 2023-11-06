import ProfileAvatar from "@/components/client/profile-avatar";
import Tweet from "@/components/client/tweet";
import { getTweets } from "@/lib/supabase/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BiCalendar } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

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
      <div className="flex items-center py-1 px-3 gap-6 sticky top-0">
        {/* <div className="flex"> */}
        <BsArrowLeft className="text-2xl" />
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{userData.user?.user_metadata?.full_name}</h1>
          {/* </div> */}
          <p className="text-gray-500 text-sm">{getUserTweets?.length || 0} posts </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col backdrop-blur bg-black/10">

          <div>
            <div className="bg-slate-400 aspect-square w-full h-40" />
            <div className="absolute z-10 w-fit bottom-24 left-5">
              <ProfileAvatar
                width="w-36 h-36 border-[3px] border-black"
                username={params.username}
                avatarUrl={getUserTweets ? getUserTweets[0].profile.avatarUrl : null}
              />
            </div>
          </div>
          <div className="p-4">
            <div className="w-full flex justify-end">
              <button className="rounded-full py-1 px-4 outline-none border-[0.5px] border-gray-400 font-semibold mb-4 hover:opacity-90">Edit profile</button>
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                {userData.user?.user_metadata?.full_name || "Profile"}
              </h1>
              <p className="text-gray-400">@{userData.user?.user_metadata?.username}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <BiCalendar className="text-lg" />
              <p>Joined {dayjs(userData.user?.created_at).format('MMMM YYYY')}</p>
            </div>
          </div>
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