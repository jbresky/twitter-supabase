'use client'

import { Dialog, DialogContent } from "./ui/dialog";
import { createBrowserClient } from "@supabase/ssr"
import { useState } from "react";
import { Input } from "./ui/input";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthModal = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [modal, setModal] = useState(true)
    const router = useRouter()
    // const [fullName, setFullName] = useState("")

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const handleModal = () => setModal(false)

    return (
        <>
            <Toaster />
            <Dialog open={modal}>
                <DialogContent className="p-4 space-y-4 m-auto bg-gray-900">
                    <h3 className="text-white text-lg">Please sign in to continue</h3>
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

                        const { data: signUpData, error: signUpError } = await supabase
                            .auth.signInWithOtp({
                                email: email.trim(),
                                options: {
                                    data: {
                                        username,
                                        // full_name: fullName
                                    },
                                    emailRedirectTo: 'http://localhost:3000/auth/callback'
                                }
                            })

                        if (signUpError) return toast.error(signUpError.message);

                        toast.success('user has been created')
                        handleModal()
                        router.refresh()
                    }}>
                        <Input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="username"
                            min={3}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="my-2"
                        />
                        {/* <Input
                            type="text"
                            placeholder="your name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="my-2"
                        /> */}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-white rounded-lg text-sm text-black font-bold p-2 hover:bg-white/80">
                            Login
                        </button>
                    </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default AuthModal;