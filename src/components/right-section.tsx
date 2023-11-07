'use client'
import { BsDot, BsSearch, BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarImage } from "./ui/avatar";

const RightSection = () => {
  return (
    <section className="hidden lg:flex w-[380px] mt-2 flex-col items-stretch px-6 shrink">
      <div>
        <div className="relative w-full h-full group">
          <input id="searchBox"
            placeholder="Search"
            className="outline-none peer bg-neutral-800/90 text-sm focus:border-primary border-neutral-800/90 border-[1px] w-full h-full rounded-full py-4 pl-12 pr-4"
          />
          <label htmlFor="searchBox" className="absolute top-0 left-0 h-full text-gray-500 flex items-center justify-center cursor-pointer p-4 peer-focus:text-primary">
            <BsSearch />
          </label>
        </div>
      </div>
      <div className="flex flex-col rounded-xl bg-neutral-900 mt-4 p-4 gap-y-2">
        <h3 className="font-bold text-xl">Subscribe to premium</h3>
        <p className="font-bold text-sm">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button className="w-fit rounded-full px-4 py-2 bg-primary font-bold text-sm hover:bg-opacity-90 transition duration-200">Subscribe</button>
      </div>

      <div className="flex flex-col rounded-xl bg-neutral-900 mt-4">
        <h3 className="font-bold text-xl px-4 py-3">What&apos;s happening</h3>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer last:rounded-b-xl">
          <div className="flex justify-between text-sm text-gray-500 items-center">
            <div className="flex items-center">
              <p>Politics</p>
              <BsDot />
              <p>Trending</p>
            </div>
            <BsThreeDots />
          </div>
          <div className="font-bold text-base">#Milei</div>
          <div className="text-xs text-neutral-400">35.4k posts</div>
        </div>
        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer">
          <div className="flex justify-between text-sm text-gray-500 items-center">
            <div className="flex items-center">
              <p>Trending in Political figures</p>
            </div>
            <BsThreeDots />
          </div>
          <div className="font-bold text-base">New York</div>
          <div className="text-xs text-neutral-400">332k posts</div>
        </div>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer">
          <div className="flex justify-between text-sm text-gray-500 items-center">
            <div className="flex items-center">
              <p>Technology</p>
              <BsDot />
              <p>Trending</p>
            </div>
            <BsThreeDots />
          </div>
          <div className="font-bold text-base">OpenAI</div>
          <div className="text-xs text-neutral-400">122k posts</div>
        </div>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer">
          <div className="flex justify-between text-sm text-gray-500 items-center">
            <div className="flex items-center">
              <p>Trending in Argentina</p>
            </div>
            <BsThreeDots />
          </div>
          <div className="font-bold text-base">Flaco</div>
          <div className="text-xs text-neutral-400">82k posts</div>
        </div>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer">
          <p className="text-sm text-primary">Show more</p>
        </div>
      </div>

      <div className="flex flex-col rounded-xl bg-neutral-900 my-4">
        <h3 className="font-bold text-xl px-4 pb-1 pt-3">Who to follow</h3>
        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer last:rounded-b-xl flex justify-between items-center gap-x-2">
          <div className="flex gap-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/images/next.jpg" />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold text-base">
                Next.js
              </p>
              <p className="text-sm text-neutral-400">@nextjs</p>
            </div>
          </div>
          <div>
            <button className="rounded-full px-4 py-1 bg-white text-gray-800 font-bold text-sm">Follow</button>
          </div>
        </div>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer last:rounded-b-xl flex justify-between items-center gap-x-2">
          <div className="flex gap-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/images/goncy.jpg" />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold text-base">
                goncy.tsx
              </p>
              <p className="text-sm text-neutral-400">@goncy</p>
            </div>
          </div>
          <button className="rounded-full px-4 py-1 bg-white text-gray-800 font-bold text-sm">Follow</button>
        </div>

        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer last:rounded-b-xl flex justify-between items-center gap-x-2">
          <div className="flex gap-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/images/cphile.jpg" />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold text-base">
                Computerphile
              </p>
              <p className="text-sm text-neutral-400">@computer_phile</p>
            </div>
          </div>
          <button className="rounded-full px-4 py-1 bg-white text-gray-800 font-bold text-sm">Follow</button>
        </div>
        <div className="hover:bg-white/10 transition duration-200 px-4 py-3 cursor-pointer rounded-b-xl">
          <p className="text-sm text-primary">Show more</p>
        </div>
      </div>
    </section >
  );
}

export default RightSection;