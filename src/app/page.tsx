import { Toaster } from "sonner";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTweets } from "@/lib/supabase/queries"
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Tweet from "@/components/client/tweet";
import Posts from "@/components/posts";

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

  const posts = await getTweets({ currentUserID: userData.user?.id })

  return (
    <>
      <Toaster />
      <main className="flex w-full max-w-[600px] min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <div className="flex flex-col">
          <Posts posts={posts}/>
        </div>
      </main>
    </>
  );
}

export default Home;