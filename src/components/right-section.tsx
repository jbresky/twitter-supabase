'use client'
import { BsSearch } from "react-icons/bs";

const RightSection = () => {
    return ( 
        <section className="hidden lg:flex w-[380px] mt-2 flex-col items-stretch px-6">
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
          <h3 className="font-bold text-xl p-4">What&apos;s happening</h3>
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="hover:bg-white/10 transition duration-200 p-4 cursor-pointer last:rounded-b-xl">
                <div className="font-bold text-base">#trending {i + 1}</div>
                <div className="text-xs text-neutral-400">35.4k</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col rounded-xl bg-neutral-800 my-4">
          <h3 className="font-bold text-xl px-4 pb-2 pt-3">Who to follow</h3>
          <div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="hover:bg-white/10 transition duration-200 p-4 cursor-pointer last:rounded-b-xl flex justify-between items-center gap-x-2">
                <div className="flex gap-x-3">
                  <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
                  <div className="flex flex-col">
                    <p className="font-bold text-base">
                      OtherUser
                    </p>
                    <p className="text-sm text-neutral-400">@user00</p>
                  </div>
                </div>
                <div>
                  <button className="rounded-full px-4 py-1 bg-white text-gray-800 font-bold text-sm">Follow</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
     );
}
 
export default RightSection;