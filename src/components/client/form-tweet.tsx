'use client'

import { useRef } from 'react'
import { toast } from "sonner"
type FormClientProps = {
    serverAction: any,
    placeholder?: string
}

const FormTweet = ({ serverAction, placeholder }: FormClientProps) => {
    const resetRef = useRef<HTMLButtonElement>(null)

    const submitTweet = async (data: any) => {
        try {
            const res = await serverAction(data)
            if (res?.error) {
                return toast.error(res.error.message)
            }
            toast.success("Tweet sent successfully")
            resetRef.current?.click();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action={submitTweet} className="flex flex-col w-full">
            <input
                className="bg-transparent outline-none border-b-[0.5px] border-gray-600 p-4 text-xl placeholder:text-xl placeholder:text-gray-600 border-none w-full h-full"
                placeholder={placeholder || "What's happening?"} 
                name="tweet"
            />
            <div className="w-full justify-between items-center flex">
                <div></div>
                <div className="w-full max-w-[100px]">
                    <button
                        className='rounded-full bg-primary px-4 py-2 w-full text-lg font-bold text-center hover:bg-opacity-90 transition duration-200'
                        type="submit"
                    >
                        Tweet
                    </button>
                    <button ref={resetRef} type='reset'></button>
                </div>
            </div>
        </form>
    );
}

export default FormTweet;