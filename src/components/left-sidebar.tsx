'use client'

import { HiOutlineHashtag } from 'react-icons/hi'
import { BsBell, BsBookmark, BsTwitter, BsEnvelope, BsThreeDots, BsPeople } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { RiTwitterXFill, RiBook2Line } from 'react-icons/ri'
import { GoHomeFill } from 'react-icons/go'
import Link from 'next/link'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { type Session } from "@supabase/auth-helpers-nextjs"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const NAVIGATION_ITEMS = [
    {
        title: 'Twitter',
        icon: RiTwitterXFill
    },
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
        icon: BsEnvelope
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
    }
]

const LeftSidebar = ({ session }: { session: Session | null }) => {

    const router = useRouter()

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <section className="w-[12vw] sticky top-0 sm:flex flex-col items-end px-4 pb-2 hidden">
            <div className='flex flex-col items-stretch h-full space-y-4 my-4'>
                {NAVIGATION_ITEMS.map(item => (
                    <Link
                        className='text-xl w-fit transition duration-200 flex items-center justify-start rounded-full p-2 hover:bg-neutral-800'
                        href={`/${item.title.toLowerCase()}`}
                        key={item.title}
                    >
                        <div className='flex items-center gap-x-5 text-center'>
                            <div>
                                <item.icon className='text-2xl' />
                            </div>
                            {item.title !== 'Twitter' && <div className='hidden 3xl:flex'>{item.title}</div>}
                        </div>
                    </Link>
                ))}
                <button className='hidden 3xl:block rounded-full mr-6 bg-primary p-4 hover:bg-opacity-90 transition duration-200'>
                    Tweet
                </button>
            </div>
            {/* <Popover>
                <PopoverTrigger className='py-2'>
                    <button className='hidden 3xl:flex w-full items-center justify-between gap-x-2 bg-transparent p-2 mb-2 hover:bg-white/20 transition duration-200 rounded-full'>
                        <div className='flex items-center gap-x-3'>
                            <div className='rounded-full bg-slate-400 w-8 h-8'></div>
                            <div className='text-left text-sx'>
                                <div className='font-semibold text-sm'>Jbresky</div>
                                <div className='font-semibold text-sm'>@jbreskydev</div>
                            </div>
                        </div>
                        <div>
                            <BsThreeDots />
                        </div>
                    </button>
                    <div className="w-8 h-8 bg-slate-200 rounded-full 3xl:hidden" />
                </PopoverTrigger>
                <PopoverContent className='bg-black text-white text-sm font-bold w-full rounded-xl p-0'>
                    <div>
                        {session && session.user.email ?
                            <>
                                <div className='hover:bg-white/10 transition duration-200 p-4 cursor-pointer'>
                                    <p>
                                        Add an existing account
                                    </p>

                                </div>
                                <button
                                    className='hover:bg-white/10 flex gap-2 p-4 rounded-b-xl cursor-pointer'
                                    onClick={handleSignOut}
                                >
                                    <p className=''>
                                        Log out
                                    </p>
                                    <p>
                                        {session.user.email}
                                    </p>
                                </button>
                            </>
                            :
                            null
                        }
                    </div>
                </PopoverContent>
            </Popover> */}
        </section >
    );
}

export default LeftSidebar;