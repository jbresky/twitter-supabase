import { Toaster } from "sonner";
import { getTweets } from "@/lib/supabase/queries"
import { cookies } from "next/headers";
import Posts from "@/components/posts";
import LeftSidebar from '@/components/left-sidebar'
import RightSection from '@/components/right-section'
import ComposeTweet from "@/components/server/compose-tweet";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies })

  const { data: { session } } = await supabase.auth.getSession()
  
  const posts = await getTweets({ currentUserID: session?.user.id })

  if (session === null) {
    redirect('/login')
  }

  return (
    <>
      <Toaster />
      <LeftSidebar session={session} />
      <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0 z-10 max-2xsm:hidden">Home</h1>
        <div className="border-t-[0.5px] border-b-[0.5px] px-4 flex items-stretch py-4 space-x-2 border-[#71767B] relative max-2xsm:hidden">
          <ComposeTweet userAvatar={session?.user?.user_metadata?.avatar_url}/>
        </div>
        <Posts posts={posts} userAvatar={session?.user?.user_metadata?.avatar_url} />
      </main>
      <RightSection />
    </>
  );
}

export default Home;