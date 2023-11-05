import Feed from "@/components/feed";
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";
import { cookies } from 'next/headers'
import { createServerClient } from "@supabase/ssr";
import { Toaster } from "sonner";
import LoginFooter from "@/components/login-footer";

const Home = async () => {
  return (
    <>
      <Toaster />
        {/* @ts-expect-error Server Component */}
        <Feed />
        {/* <RightSection /> */}
      {/* {data.session === null ? (
        <LoginFooter />
      ) : ''} */}
    </>
  );
}

export default Home;