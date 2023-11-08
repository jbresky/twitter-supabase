'use client'

import { HiOutlineHashtag } from 'react-icons/hi'
import { BsBell, BsBookmark, BsThreeDots, BsPeople } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { RiTwitterXFill, RiBook2Line } from 'react-icons/ri'
import { FaRegEnvelope } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import Link from 'next/link'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const NAVIGATION_ITEMS = [
    {
        title: 'Home',
        icon: GoHomeFill
    },
    {
        title: 'Explore',
        icon: HiOutlineHashtag
    },
    {
        title: 'Notification',
        icon: BsBell
    },
    {
        title: 'Messages',
        icon: FaRegEnvelope
    },
    {
        title: 'Bookmark',
        icon: BsBookmark
    },
    {
        title: 'Profile',
        icon: BiUser
    },
    {
        title: 'Lists',
        icon: RiBook2Line
    },
    {
        title: 'Communities',
        icon: BsPeople
    },
    {
        title: 'Premium',
        icon: RiTwitterXFill
    },
    {
        title: 'More',
        icon: BsThreeDots
    },
]

const LeftSidebar = ({ session }: { session: Session | null }) => {

    const router = useRouter()

    const supabase = createClientComponentClient()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <section className="2xl:w-[275px] sticky top-0 left-0 h-screen xsm:flex flex-col items-end 2xl:items-start px-4 pb-2 overflow-y-auto overflow-x-hidden hidden">
            <div className='w-full flex flex-col h-full space-y-4 my-2'>
                <Link
                    className='w-full transition duration-200 flex py-2 px-4 rounded-full hover:bg-neutral-900'
                    href='/'
                    key='twitter logo'
                >
                    <RiTwitterXFill className='text-[30px]' />
                </Link>
                {NAVIGATION_ITEMS.map(item => (
                    <Link
                        className='text-xl w-full transition duration-200 flex items-center justify-start group'
                        href={`/#${item.title.toLowerCase()}`}
                        key={item.title}
                    >
                        <div className='w-fit flex items-center text-center py-2 px-4 gap-5 rounded-full group-hover:bg-neutral-900'>
                            <div>
                                <item.icon className='text-2xl' />
                            </div>
                            {item.title !== 'Twitter' && <div className='hidden 2xl:flex'>{item.title}</div>}
                        </div>
                    </Link>
                ))}
                <button className='hidden 2xl:block w-full rounded-full bg-primary p-3 hover:bg-opacity-90 transition duration-200'>
                    Tweet
                </button>
            </div>
            {session && (
                <Popover>
                    <PopoverTrigger className='py-2 w-full'>
                        <div className='hidden 2xl:flex items-center justify-between gap-x-2 bg-transparent p-2 mb-2 hover:bg-neutral-900 transition duration-200 rounded-full'>
                            <div className='flex items-center gap-x-3'>
                                <img className='rounded-full w-10 h-10' src={session.user?.user_metadata?.avatar_url} />
                                <div className='text-left text-sx'>
                                    <div className='font-semibold text-sm tracking-wide'> {session.user?.user_metadata.full_name}</div>
                                    <div className='font-semibold text-sm text-gray-500 tracking-wide'>@{session.user?.user_metadata.username}</div>
                                </div>
                            </div>
                            <div>
                                <BsThreeDots />
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className='bg-black text-white text-sm font-bold w-full rounded-xl p-0'>
                        <div>
                            <>
                                <div className='hover:bg-white/10 transition duration-200 p-4 cursor-pointer'>
                                    <p>
                                        Add an existing account
                                    </p>

                                </div>
                                <div
                                    className='hover:bg-white/10 flex gap-2 p-4 rounded-b-xl cursor-pointer'
                                onClick={handleSignOut}
                                >
                                    <p className=''>
                                        Log out
                                    </p>
                                    <p>
                                        @{session.user?.user_metadata.username}
                                    </p>
                                </div>
                            </>

                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </section >
    );
}

export default LeftSidebar;