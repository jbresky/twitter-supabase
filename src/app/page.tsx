import Feed from "@/components/feed";
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";
import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr";
import { Toaster } from "sonner";
import LoginFooter from "@/components/login-footer";

const Home = async () => {
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

  const { data } = await supabase.auth.getSession();

  return (
    <>
      <Toaster />
      <div className="w-full h-full flex justify-center bg-black text-white">
        {/* @ts-expect-error Server Component */}
        <LeftSidebar session={data.session} />
        {/* @ts-expect-error Server Component */}
        <Feed />
        <RightSection />
      </div>
      {data.session === null ? (
        <LoginFooter />
      ) : ''}
    </>
  );
}

export default Home;