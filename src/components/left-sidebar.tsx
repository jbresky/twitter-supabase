import { BiHomeCircle } from 'react-icons/bi'
import { HiOutlineHashtag } from 'react-icons/hi'
import { BsBell, BsBookmark, BsTwitter, BsEnvelope, BsThreeDots, BsPeople } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { RiTwitterXFill, RiBook2Line } from 'react-icons/ri'
import Link from 'next/link'

const NAVIGATION_ITEMS = [
    {
        title: 'Twitter',
        icon: BsTwitter
    },
    {
        title: 'Home',
        icon: BiHomeCircle
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

const LeftSidebar = () => {
    return (
        <section className="w-[275px] sticky top-0 flex flex-col items-stretch h-screen px-4">
            <div className='flex flex-col items-stretch h-full space-y-4 my-4'>
                {NAVIGATION_ITEMS.map(item => (
                    <Link
                        className='text-xl transition duration-200 flex items-center justify-start space-x-3 rounded-full p-2 hover:bg-neutral-800'
                        href={`/${item.title.toLowerCase()}`}
                        key={item.title}
                    >
                        <div className='flex items-center gap-x-5 pl-2'>
                            <div>
                                <item.icon className='text-2xl' />
                            </div>
                            {item.title !== 'Twitter' && <div>{item.title}</div>}
                        </div>
                    </Link>
                ))}
                <button className='rounded-full mr-6 bg-primary p-4 hover:bg-opacity-90 transition duration-200'>
                    Tweet
                </button>
            </div>
            <button className='flex items-center justify-between gap-x-2 bg-transparent p-4 hover:bg-white/20 transition duration-200 rounded-full'>
                <div className='flex items-center gap-x-3'>
                    <div className='rounded-full bg-slate-400 w-8 h-8'></div>
                    <div className='text-left text-sx'>
                        <div className='font-semibold'>Jbresky</div>
                        <div>@jbreskydev</div>
                    </div>
                </div>
                <div className=''>
                    <BsThreeDots />
                </div>
            </button>
        </section>
    );
}

export default LeftSidebar;