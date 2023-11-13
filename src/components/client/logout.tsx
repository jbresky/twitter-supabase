'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Logout = ({ session }: { session: Session | null }) => {

    const router = useRouter()

    const supabase = createClientComponentClient()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return ( 
        <Popover>
        <PopoverTrigger className='py-2 w-full flex items-end'>
            <div className='2xl:hidden'>
                <img className=' rounded-full w-10 h-10' src={session?.user.user_metadata.avatar_url || '/images/next.jpg'} />
            </div>
            <div className='hidden w-full 2xl:flex items-center justify-between gap-x-2 bg-transparent p-2 mb-2 hover:bg-neutral-900 transition duration-200 rounded-full'>
                <div className='flex items-center gap-x-3'>
                    <img className='rounded-full w-10 h-10' src={session?.user?.user_metadata?.avatar_url} />
                    <div className='text-left text-sx'>
                        <div className='font-semibold text-sm tracking-wide'> {session?.user?.user_metadata.full_name}</div>
                        <div className='font-semibold text-sm text-gray-500 tracking-wide'>@{session?.user?.user_metadata.username}</div>
                    </div>
                </div>
                <div>
                    <BsThreeDots />
                </div>
            </div>
        </PopoverTrigger>
        <PopoverContent className='bg-black text-white text-sm font-bold w-full rounded-xl'>
            <div>
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
                            @{session?.user?.user_metadata.username}
                        </p>
                    </div>
            </div>
        </PopoverContent>
    </Popover>
     );
}
 
export default Logout;