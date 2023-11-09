import ProfileAvatar from "@/components/client/profile-avatar";
import Tweet from "@/components/client/tweet";
import { getTweets } from "@/lib/supabase/queries";
import { createPagesBrowserClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BiCalendar, BiLeftArrowAlt } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegEnvelope } from 'react-icons/fa'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";

const UserProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {

  const supabaseClient = createPagesBrowserClient();

  const { data: { session } } = await supabaseClient.auth.getSession()

  const { data: userData } = await supabaseClient.auth.getUser();

  const getUserTweets = await getTweets({
    currentUserID: userData.user?.id,
    profileUsername: params.username,
  });

  return (
    <>
      <LeftSidebar session={session} />

      <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <div className="flex items-center pb-[2px] pt-1 px-3 gap-7 backdrop-blur sticky top-0 z-10">
          <BiLeftArrowAlt className="text-2xl" />
          <div className="flex flex-col">
            <h1 className="font-semibold">{getUserTweets ? getUserTweets[0].profile.fullName : null}</h1>
            <p className="text-gray-500 text-[13px]">{getUserTweets?.length || 0} posts </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col backdrop-blur bg-black/10 max-2xsm:gap-4">
            <div>
              <div className="bg-gradient-to-b from-purple-400 to-indigo-500 aspect-square w-full max-2xsm:h-24 h-48" />
              <div className="absolute z-10 w-fit max-2xsm:bottom-[8.5rem] bottom-24 max-2xsm:left-[1rem] left-5">
                <ProfileAvatar
                  width="max-2xsm:w-16 max-2xsm:h-16 max-xsm:w-24 max-xsm:h-24 w-36 h-36 border-[3px] border-black"
                  username={params.username}
                  avatarUrl={getUserTweets ? getUserTweets[0].profile.avatarUrl : null}
                />
              </div>
            </div>
            <div className="p-4">
              <div className="w-full flex justify-end">
                {getUserTweets && getUserTweets[0].profile.username !== session?.user.user_metadata.user_name ? (
                  <button className="rounded-full py-1 px-4 outline-none border-[0.5px] border-gray-400 font-semibold mb-4 hover:opacity-90">
                    Edit profile
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="border border-gray-500 p-2 rounded-full">
                      <BsThreeDots className="text-lg" />
                    </div>
                    <div className="border border-gray-500 p-2 rounded-full">
                      <FaRegEnvelope className="text-lg" />
                    </div>
                    <button className="bg-white text-black text-[15px] rounded-full py-1 px-4 font-semibold hover:opacity-90">Follow</button>
                  </div>
                )}
              </div>
              <div className="mb-3 leading-4">
                <h1 className="text-lg font-semibold">
                  {getUserTweets ? getUserTweets[0].profile.fullName : null}
                </h1>
                <p className="text-gray-500">@{getUserTweets ? getUserTweets[0].profile.username : null}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <BiCalendar className="text-lg" />
                <p className="text-[15px]">Joined {dayjs(userData.user?.created_at).format('MMMM YYYY')}</p>
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
      <RightSection />
    </>
  );
};

export default UserProfilePage;