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
import { createServerClient } from '@supabase/ssr'
// import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

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
    },
]

const LeftSidebar = async ({ session }: { session: Session | null } ) => {

    // const router = useRouter()
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

    const {data: userData} = await supabaseServer.auth.getUser()

    // const handleSignOut = async () => {
    //     await supabase.auth.signOut()
    //     router.refresh()
    // }

    return (
        <section className="2xl:w-[275px] h-screen xsm:flex flex-col items-end 2xl:items-start px-4 pb-2 overflow-y-auto hidden">
            <div className='w-full flex flex-col items-stretch h-full space-y-4 my-4'>
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
            {session && session.user.email ? (
                <Popover>
                    <PopoverTrigger className='py-2 w-full'>
                        <div className='hidden 2xl:flex items-center justify-between gap-x-2 bg-transparent p-2 mb-2 hover:bg-neutral-900 transition duration-200 rounded-full'>
                            <div className='flex items-center gap-x-3'>
                                <div className='rounded-full bg-slate-400 w-8 h-8'></div>
                                <div className='text-left text-sx'>
                                    <div className='font-semibold text-sm tracking-wide'> {userData.user?.user_metadata.full_name}</div>
                                    <div className='font-semibold text-sm text-gray-500 tracking-wide'>@{userData.user?.user_metadata.username}</div>
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
                                    // onClick={handleSignOut}
                                >
                                    <p className=''>
                                        Log out
                                    </p>
                                    <p>
                                        @{userData.user?.user_metadata.username}
                                    </p>
                                </div>
                            </>

                        </div>
                    </PopoverContent>
                </Popover>
            ) : null}
        </section >
    );
}

export default LeftSidebar;