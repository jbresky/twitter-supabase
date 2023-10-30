import Feed from "@/components/feed";
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";
import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr";
import { AuthButtonServer } from "@/components/auth-button-server";
import { Toaster } from "sonner";

const Home = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string){
          return cookieStore.get(name)?.value
        }
      }
    }
)

  const { data, error } = await supabase.auth.getSession();
  
  return (
    <>
    <Toaster/>
    <div className="w-full h-full m-auto flex justify-center items-center text-white relative bg-black">

      <div className="lg:max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar session={data.session} />
      {/* @ts-expect-error Server Component */}
        <Feed />
        {/* {data.session !== null ? (
          
          <AuthModal />
        ) : ''} */}

      {/* @ts-expect-error Server Component */}
        <AuthButtonServer/>
        <RightSection />
      </div>
    </div> 
    </>
  );
}

export default Home;