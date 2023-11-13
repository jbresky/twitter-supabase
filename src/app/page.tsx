import Logout from "@/components/client/logout";
import Posts from "@/components/posts";
import LeftSidebar from '@/components/left-sidebar'
import RightSection from '@/components/right-section'
import ComposeTweet from "@/components/server/compose-tweet";
import TweetDialog from "@/components/tweet-dialog";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTweets } from "@/lib/supabase/queries"
import { createServerClient } from "@supabase/ssr";

const Home = async () => {

  const cookieStore = cookies()

  const supabaseServer = createServerClient(
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

  const { data: userData } = await supabaseServer.auth.getUser()
  const { data: { session } } = await supabaseServer.auth.getSession()

  const posts = await getTweets({ currentUserID: userData.user?.id })

  if (session === null) {
    redirect('/login')
  }

  return (
    <>
      <Toaster />
      <section className="2xl:w-[275px] sticky top-0 left-0 h-screen xsm:flex justify-between flex-col items-end 2xl:items-start px-4 pb-2 overflow-y-auto overflow-x-hidden hidden">
        <LeftSidebar session={session} />
        <Logout session={session}/>
      </section>
      <main className="flex w-full max-w-[600px] flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0 z-10 max-xsm:hidden">Home</h1>
        <div className="border-t-[0.5px] px-4 flex items-stretch py-4 space-x-2 border-gray-700 relative max-xsm:hidden">
          <ComposeTweet userAvatar={session?.user?.user_metadata?.avatar_url} />
        </div>
        <div className="xsm:hidden">
          <TweetDialog userAvatar={session?.user?.user_metadata?.avatar_url} />
        </div>
        <Posts posts={posts} session={session} />
      </main>
      <RightSection />
    </>
  );
}

export default Home;