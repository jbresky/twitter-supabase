import { HiOutlineHashtag } from 'react-icons/hi'
import { BsBell, BsBookmark, BsThreeDots, BsPeople } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { RiTwitterXFill, RiBook2Line } from 'react-icons/ri'
import { FaRegEnvelope } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
import Link from 'next/link'
import { Session } from '@supabase/supabase-js'
import TweetDialog from './tweet-dialog'

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

    return (
            <div className='w-full flex flex-col space-y-4 my-2'>
                <div className='w-fit flex items-center text-center p-2 gap-5 rounded-full group-hover:bg-neutral-900'>
                    <Link
                        href='/'
                        key='twitter logo'
                    >
                        <RiTwitterXFill className='text-[30px]' />
                    </Link>
                </div>
                {NAVIGATION_ITEMS.map(item => (
                    <Link
                        className='text-xl w-full 2xl:flex transition duration-200 flex items-center justify-start group'
                        href={`/#${item.title.toLowerCase()}`}
                        key={item.title}
                    >
                        <div className='w-fit 2xl:flex items-center text-center p-2 gap-5 rounded-full group-hover:bg-neutral-900'>
                            <item.icon className='text-2xl' />
                            {item.title !== 'Twitter' && <div className='hidden 2xl:flex'>{item.title}</div>}
                        </div>
                    </Link>
                ))}
                <TweetDialog
                userAvatar={session?.user.user_metadata.avatar_url || '/images/next.jpg' } />
            </div>
    );
}

export default LeftSidebar;