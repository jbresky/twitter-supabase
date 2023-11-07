import Feed from "@/components/feed";
import { Toaster } from "sonner";
import LoginFooter from "@/components/client/login-footer";

const Home = async () => {

  return (
    <>
      <Toaster />
      {/* @ts-expect-error Server Component */}
      <Feed />
      {/* {data.session === null ? (
        <LoginFooter />
      ) : ''} */}
    </>
  );
}

export default Home;