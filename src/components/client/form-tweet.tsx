'use client'

import { useRef } from 'react'
import { toast } from "sonner"
import ComposeButton from './compose-button'
type FormClientProps = {
    serverAction?: any,
    placeholder?: string,
    userAvatar: string
}

const FormTweet = ({ serverAction, placeholder, userAvatar }: FormClientProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const submitTweet = async (data: any) => {
        try {
            const res = await serverAction(data)
            if (res?.error) {
                return toast.error(res.error.message)
            }
            toast.success("Tweet sent successfully")
            formRef.current?.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form ref={formRef} action={submitTweet} className="w-full flex">
            <img className='rounded-full w-10 h-10' src={userAvatar || '/images/next.jpg'} />
            <div className='w-full flex flex-col'>
                <input
                    className="w-full bg-transparent outline-none border-b-[0.5px] border-gray-600 px-4 pb-2 text-xl placeholder:text-xl placeholder:text-gray-600 border-none"
                    placeholder={placeholder || "What's happening?"}
                    name="tweet"
                />
                <div className="w-full flex justify-end">
                    {/* <div></div> */}
                        <ComposeButton />
                </div>
            </div>
        </form>
    );
}

export default FormTweet;