'use client'

const LoginFooter = () => {
    return (
        <div className="h-16 hidden bg-login text-white justify-around items-center fixed bottom-0 w-full">
            <div className="hidden md:flex flex-col">
                <div className="font-bold text-xl">Don&apos;t miss what&apos;s happening</div>
                <div className="text-sm">People on X are the first to know.</div>
            </div>
            <div className="flex gap-4 justify-center">
                <button className="w-[40vw] md:w-fit px-4 rounded-full font-semibold border-white border-[1px]">Log in</button>
                <button className="w-[40vw] md:w-fit px-4 py-2 rounded-full font-semibold text-black bg-white hover:opacity-90">Sign up</button>
            </div>
        </div>
    );
}

export default LoginFooter;