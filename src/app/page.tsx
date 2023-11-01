import Feed from "@/components/feed";
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";
import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr";
import { AuthButtonServer } from "@/components/auth-button-server";
import { Toaster } from "sonner";
import AuthModal from "@/components/auth-modal";
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

  const { data, error } = await supabase.auth.getSession();

  return (
    <>
      <Toaster />
      <div className="w-full h-full m-auto flex justify-center items-center text-white relative bg-black">

        <div className="w-full h-full flex">
          <div className="overflow-visible">
            <LeftSidebar session={data.session} />
          </div>
          {/* @ts-expect-error Server Component */}
          <Feed />

          {/* <AuthButtonServer/> */}
          <RightSection />
        </div>
      </div>
      {data.session === null ? (

        // <AuthModal />
        <LoginFooter />
      ) : ''}
    </>
  );
}

export default Home;