'use client'

import LoginModal from "./login-modal";

const LoginFooter = () => {
    return (
        <div className="w-full flex h-16 bg-login text-white justify-around items-center fixed bottom-0">
            <div className="hidden md:flex flex-col">
                <div className="font-bold text-xl">Don&apos;t miss what&apos;s happening</div>
                <div className="text-sm">People on X are the first to know.</div>
            </div>
            <div className="flex gap-4 justify-center">
                {/* <button className="w-[40vw] md:w-fit px-4 rounded-full font-semibold border-white border-[1px]">Log in</button> */}
                <LoginModal classname="w-[40vw] md:w-fit px-4 py-2 rounded-full font-semibold border-white border-[1px] cursor-pointer" />
                <button className="w-[40vw] md:w-fit px-4 py-2 rounded-full font-semibold text-black bg-white hover:opacity-90">Sign up</button>
            </div>
        </div>
    );
}

export default LoginFooter;