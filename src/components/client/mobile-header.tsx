import { AiOutlineSetting, AiOutlineUserAdd } from "react-icons/ai";
import { BsBookmark, BsPeople } from 'react-icons/bs'
import { FaMoneyBills } from 'react-icons/fa6'
import { RiTwitterXFill, RiBook2Line } from 'react-icons/ri'
import { MdAdd } from 'react-icons/md'
import { BiUser } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

const NAVIGATION_ITEMS = [

    {
        title: 'Profile',
        icon: BiUser
    },
    {
        title: 'Premium',
        icon: RiTwitterXFill
    },
    {
        title: 'Lists',
        icon: RiBook2Line
    },
    {
        title: 'Bookmark',
        icon: BsBookmark
    },
    {
        title: 'Communities',
        icon: BsPeople
    },
    {
        title: 'Follower requests',
        icon: AiOutlineUserAdd
    },
    {
        title: 'Monetization',
        icon: FaMoneyBills
    },
]


const MobileHeader = ({ session }: { session?: Session | null }) => {
    return (
    <>
        <header className="w-full flex flex-col xsm:hidden border-b-1 border-gray-500 pt-2 z-10">
            <div className="flex justify-between items-center px-3">
                <div className="flex items-center">
                    {/* drawer */}

                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-transparent border-none p-0">
                                <img className='rounded-full w-10 h-10' src={session?.user?.user_metadata?.avatar_url || '/images/next.jpg'} />
                            </label>
                        </div> 
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full text-white bg-black z-20 min-w-[280px] max-w-[70%] shadow-gray-600 shadow-lg">
                                {/* Sidebar content here */}
                                <div className="flex justify-between pb-2">
                                    <img className='rounded-full w-8 h-8' src={session?.user?.user_metadata?.avatar_url || '/images/next.jpg'} />
                                    <div className="border-gray-700 p-2 border-[0.5px] rounded-full">
                                        <MdAdd className="text-white text-xl" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 pb-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-lg">{session?.user?.user_metadata?.full_name}</span>
                                        <span className="text-[#71767B]">@{session?.user?.user_metadata?.username}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <span className="font-semibold">100</span>
                                            <span className="text-[#71767B]"> Following</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold">80</span>
                                            <span className="text-[#71767B]"> Followers</span>
                                        </div>
                                    </div>
                                </div>

                                {NAVIGATION_ITEMS.map(item => (
                                    <Link
                                        className='text-xl w-full 2xl:flex transition duration-200 font-semibold flex items-center justify-start group'
                                        href={`/#${item.title.toLowerCase()}`}
                                        key={item.title}
                                    >
                                        <div className='w-fit flex items-center text-center py-3 gap-5 rounded-full group-hover:bg-neutral-900'>
                                            <item.icon className='text-2xl' />
                                            {item.title !== 'Twitter' && <div>{item.title}</div>}
                                        </div>
                                    </Link>
                                ))}

                                <div className="flex flex-col border-t-[1px] border-gray-700 font-semibold">
                                    <div className="flex justify-between items-center py-4">
                                        <span>Creator Studio</span>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>
                                    <div className="flex justify-between items-center py-4">
                                        <span>Professional Tools</span>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>
                                    <div className="flex justify-between items-center py-4">
                                        <span>Settings and Support</span>
                                        <IoIosArrowDown className="text-xl"/>
                                    </div>
                                </div>
                                {/* Sidebar content here */}
                            </ul>
                        </div>
                    </div>


                    <h1 className="text-xl font-bold p-4 bg-black/10 max-2xsm:hidden">Home</h1>
                </div>
                <AiOutlineSetting className="w-10 h-6" />
            </div>
            <div className="flex justify-around mt-4">
                <div className="h-10 flex flex-col gap-[14px]">
                    <h2 className="font-semibold text-[#e7e9ea]">For you</h2>
                    <div className='w-full rounded-xl border-b-8-primary h-[12px] bg-primary'></div>
                </div>
                <div className="">
                    <h2 className="font-semibold text-[#71767b]">Following</h2>
                </div>
            </div>
            {/* <div className="w-full text-center py-3 border-t-[0.5px] border-gray-700">
             <span className="text-primary">Show 220 posts</span>
         </div> */}
        </header>
    </>
    );
}

export default MobileHeader;
