import { RiTwitterXFill } from 'react-icons/ri'
import Link from 'next/link'
import AuthButton from '@/components/client/auth-button'
import LoginModal from '@/components/client/login-modal'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const footer = [
    {
        title: 'About'
    },
    {
        title: 'Download the X app'
    },
    {
        title: 'Help Center'
    },
    {
        title: 'Terms of service'
    },
    {
        title: 'Privacy Policy'
    }, {
        title: 'Cookie Policy'
    }, {
        title: 'Accessibility'
    }, {
        title: 'Ads info'
    }, {
        title: 'Blog'
    }, {
        title: 'Status'
    },
    {
        title: 'X for Business'
    }, {
        title: 'Developers'
    }, {
        title: 'Directory'
    }
]

const Login = async () => {

    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
  
    if (session !== null) {
      redirect('/')
    }

    return (
        <>
            <div className="flex flex-col bg-black m-auto sm:h-[100vh]">
                <div className="w-full max-md:w-[90%] items-center max-md:justify-center flex max-md:flex-col max-md:gap-2 max-md:p-2 text-white h-[100vh] px-4 m-auto">
                    <div className='w-full'>
                        <RiTwitterXFill className='text-[50px] md:text-[250px] 2xl:text-[350px]' />
                    </div>
                    <div className='flex flex-col w-full items-start gap-2'>
                        <h1 className='text-[25px] sm:text-[40px] font-bold text-gray-200 tracking-normal'>Happening now</h1>
                        <h2 className='text-[18px] sm:text-[25px] font-bold text-gray-200'>Join today.</h2>
                        <div className='w-full flex flex-col items-start gap-2'>
                            <AuthButton />
                            <div className='w-full flex items-center justify-between gap-2'>
                                <div className='w-full border-t-2-gray h-[1px] bg-gray-700'></div>
                                <p>or</p>
                                <div className='w-full border-2-white h-[1px] bg-gray-700'></div>
                            </div>
                            <div className='pb-4 text-sm text-gray-300'>Please provide a valid email address below as a confirmation link will be sent for authentication</div>
                            <LoginModal />
                            <div className='w-full flex flex-col gap-4'>
                                <h3 className='font-semibold text-lg'>Already have an account?</h3>
                                <button className='w-full text-primary border-2 border-gray-500 py-3 px-4 rounded-full text-sm font-semibold'>
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='flex flex-wrap justify-center max-md:gap-1  gap-2 bg-black text-gray-500 text-[12px] p-2'>
                    {footer.map((item, index) => (
                        <Link key={index} className='cursor-pointer hover:underline' href={`/${item.title.toLowerCase().replace(/ /g, '-')}`}>
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </footer>
            </div>
        </>
    );
}

export default Login;