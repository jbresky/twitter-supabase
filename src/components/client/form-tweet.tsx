'use client'

import { PostgrestError } from "@supabase/supabase-js"
import { useRef } from 'react'
import { toast } from "sonner"
type FormClientProps = {
    serverAction: any
    // (
    //     formData: FormData
    // ) => Promise<
    //     | { error: { message: string }; data?: undefined }
    //     | { data: null; error: PostgrestError | null }
    //     | undefined
    // >
}

const FormTweet = ({ serverAction }: FormClientProps) => {
    // const resetRef = useRef<HTMLButtonElement>(null)

    const submitTweet = async (data: any) => {
        try {
            const res = await serverAction(data)
            if (res?.error) {
                return toast.error(res.error.message)
            }
            toast.success("Tweet sent successfully")
            // resetRef.current?.click();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form action={submitTweet} className="flex flex-col w-full h-full">
            <input
                className="bg-transparent outline-none border-b-[0.5px] border-dgray-600 p-4 text-xl placeholder:text-xl placeholder:text-gray-600 border-none w-full h-full"
                placeholder="What's happening?"
                name="tweet"
            />
            <div className="w-full justify-between items-center flex">
                <div></div>
                <div className="w-full max-w-[100px]">
                    <button
                        className='rounded-full bg-primary px-4 py-2 w-full text-lg font-bold text-center hover:bg-opacity-90 transition duration-200'
                        type="submit"
                        // ref={resetRef}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FormTweet;