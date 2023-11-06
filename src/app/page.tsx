import Feed from "@/components/feed";
import { createServerClient } from "@supabase/ssr";
import { Toaster } from "sonner";
import LoginFooter from "@/components/client/login-footer";
import { cookies } from "next/headers";

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

  const { data } = await supabaseServer.auth.getSession();
  return (
    <>
      <Toaster />
      {/* @ts-expect-error Server Component */}
      <Feed session={data.session} />
      {data.session === null ? (
        <LoginFooter />
      ) : ''}
    </>
  );
}

export default Home;