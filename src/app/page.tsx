import Feed from "@/components/Feed";
import LeftSidebar from "@/components/LeftSidebar";
import RightSection from "@/components/RightSection";

const Home = () => {
  return (
    <div className="w-full max-w-[80vw] h-full m-auto flex justify-center items-center relative bg-black">
      <div className="max-w-[70vw] w-full h-full flex relative">
        <LeftSidebar />
        <Feed />
        <RightSection />
      </div>
    </div>
  );
}

export default Home;