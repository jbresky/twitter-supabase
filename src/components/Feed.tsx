import { BsChat, BsDot, BsThreeDots } from "react-icons/bs";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import ComposeTweet from "./server/compose-tweet";

const Feed = () => {
    return ( 
        <main className="flex w-full max-w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
        <h1 className="text-xl font-bold p-4 backdrop-blur bg-black/10 sticky top-0">Home</h1>
        <div className="border-t-[0.5px] border-b-[0.5px] px-4 flex items-stretch py-4 space-x-2 border-gray-600 relative">
          <div className="w-10 h-10 bg-slate-400 rounded-full flex-none"></div>
          <ComposeTweet/>
        </div>
        <div className="flex flex-col">
          {
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="p-4 border-b-[0.5px] border-gray-600 flex space-x-4"
              >
                <div>
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="flex items-center space-x-1 w-full">
                      <div className="font-bold hover:underline cursor-pointer">Jbresky</div>
                      <div className="text-gray-500">@jbreskydev</div>
                      <div className="text-gray-500">
                        <BsDot />
                      </div>
                      <div className="text-gray-500">1h</div>
                    </div>
                    <div className="hover:text-blue-500 cursor-pointer">
                      <BsThreeDots />
                    </div>
                  </div>
                  <div className="text-white text-base">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius!
                  </div>
                  <div className="bg-slate-400 aspect-square w-full h-96 rounded-xl"></div>
                  <div className="flex items-center w-full justify-between text-sm text-gray-400 pt-1">
                    <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
                      <BsChat />
                      <div>
                        {Math.floor(Math.random() * 1000) + 1}
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center hover:text-green-500 cursor-pointer">
                      <AiOutlineRetweet />
                      <div>
                        {Math.floor(Math.random() * 1000) + 1}
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center hover:text-red-500 cursor-pointer">
                      <AiOutlineHeart />
                      <div>
                        {Math.floor(Math.random() * 1000) + 1}
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
                      <IoStatsChart />
                      <div>
                        {Math.floor(Math.random() * 1000) + 1}
                      </div>
                    </div>
                    <div className="flex space-x-2 items-center hover:text-blue-500 cursor-pointer">
                      <IoShareOutline />
                      <div>
                        {Math.floor(Math.random() * 1000) + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </main>
     );
}
 
export default Feed;