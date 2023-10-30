'use client'

import { RiTwitterXFill } from 'react-icons/ri'
import { AiFillApple } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

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
    }, {
        title: 'Careers'
    }, {
        title: 'Brand Resources'
    }, {
        title: 'Advertising'
    }, {
        title: 'Marketing'
    }, {
        title: 'X for Business'
    }, {
        title: 'Developers'
    }, {
        title: 'Directory'
    },
    {
        title: 'Settings'
    },
    {
        title: '@ 2023 X Corp.'
    },
]

const Login = () => {
    return (
        <>
            <div className="flex flex-col h-[100vh] bg-black">
                <div className="w-full flex justify-between items-stretch p-24 text-white h-[100vh]">
                    <div className='w-full px-20 pt-40 '>
                        <RiTwitterXFill className='w-[700px] text-[350px]' />
                    </div>
                    <div className='flex flex-col w-full items-start gap-4 px-28 pt-32'>
                        <h1 className='text-[60px] font-bold text-gray-200'>Happening now</h1>
                        <h2 className='text-[30px] font-bold text-gray-200'>Join today.</h2>
                        <div className='flex flex-col items-center gap-4 w-[45%]'>
                            <button className='w-full bg-white text-gray-700 py-3 px-10 rounded-full text-sm font-semibold flex items-center justify-center gap-2'>
                                <FcGoogle className='text-xl' />
                                Singup with Google
                            </button>
                            <button className='w-full bg-white text-gray-700 py-3 px-10 rounded-full text-sm font-semibold flex items-center justify-center gap-2'>
                                <AiFillApple className='text-xl' />
                                Singup with Apple
                            </button>
                            <div className='w-full flex items-center justify-between gap-2'>
                                <div className='w-full border-t-2-gray h-[1px] bg-gray-700'></div>
                                <p>or</p>
                                <div className='w-full border-2-white h-[1px] bg-gray-700'></div>
                            </div>
                            <div className='w-full'>
                                <button className='w-full bg-primary text-white py-3 px-4 rounded-full text-sm font-semibold'>
                                    Create account
                                </button>
                                <div className='text-[11px] py-1 text-gray-400'>By signing up, you agree to the
                                <span className='text-primary cursor-pointer'> Terms of Service</span> and <span className='text-primary cursor-pointer'> Privacy Policy</span>, including <span className='text-primary cursor-pointer'> Cookie Use</span>.</div>
                            </div>
                            <div className='w-full flex flex-col gap-4 pt-6'>
                                <h3 className='font-semibold text-lg'>Already have an account?</h3>
                                <button className='w-full text-primary border-2 border-gray-500 py-3 px-4 rounded-full text-sm font-semibold'>
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className='flex justify-center gap-4 bg-black text-gray-500 text-[13px] p-4'>
                    {footer.map(item => (
                        <Link className='cursor-pointer hover:underline' href={`/${item.title.toLowerCase().replace(/ /g, '-')}`}>
                        <span>{item.title}</span>
                        </Link>
                    ))}
                </footer>
            </div>
        </>
    );
}

export default Login;