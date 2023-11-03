'use client'

import { Dialog, DialogContent } from "./ui/dialog";
import { createBrowserClient } from "@supabase/ssr"
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AuthButton from "./auth-button";
import { DialogTrigger } from "@radix-ui/react-dialog";

const AuthModal = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [isModalgOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const [fullName, setFullName] = useState("")

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    return (
        <>
            <Dialog onOpenChange={setIsModalOpen} open={isModalgOpen}>
                <DialogTrigger asChild>
                    <div className='rounded-full bg-white text-black px-4 py-2 w-full text-lg font-bold text-center cursor-pointer hover:bg-opacity-90 transition duration-200'>
                        Log in
                    </div>
                </DialogTrigger>
                <DialogContent className="p-10 space-y-4 m-auto bg-black top-[50%] border-none">
                    <div className="w-[75%] m-auto">
                        <div className="flex flex-col items-start w-full gap-4">
                            <h3 className="text-white text-3xl">Sign in to X</h3>
                            <AuthButton />
                            <div className='w-full flex items-center justify-between gap-2'>
                                <div className='w-full border-t-2-gray h-[1px] bg-gray-700'></div>
                                <p className="text-white text-sm">or</p>
                                <div className='w-full border-2-white h-[1px] bg-gray-700'></div>
                            </div>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault()
                            // check if the username already exists
                            const { data, error } = await supabase
                                .from('profiles')
                                .select()
                                .eq('username', username.trim());

                            if (data && data?.length > 0) {
                                return toast.error("username already in use, try another")
                            }

                            const { error: signUpError } = await supabase
                                .auth.signInWithOtp({
                                    email: email.trim(),
                                    options: {
                                        data: {
                                            username,
                                            full_name: fullName
                                        },
                                        emailRedirectTo: 'http://localhost:3000/auth/callback'
                                    }
                                })

                            if (signUpError) return toast.error(signUpError.message);

                            toast.success('user has been created')
                            setIsModalOpen(false)
                            router.refresh()
                        }}>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="my-2 bg-transparent border-gray-800 mb-4 h-14 text-white"
                            />
                            <Input
                                type="text"
                                placeholder="username"
                                min={3}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="my-2 bg-transparent border-gray-800 mb-4 h-14 text-white"
                            />
                            <Input
                                type="text"
                                placeholder="your name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="my-2 bg-transparent border-gray-800 mb-4 h-14 text-white"
                            />
                            <div>
                                <button type="submit" className="w-full bg-white rounded-full text-sm text-black font-bold p-2 hover:bg-white/80">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AuthModal;