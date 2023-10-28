import { createServerClient } from "@supabase/ssr";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { SupabaseClient } from "@supabase/supabase-js";

const ComposeTweet = () => {
    async function submitTweet(formData: FormData) {
        'use server';

        const tweet = formData.get("tweet");

        if (!tweet) return

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!

        const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey)

        if(!supabaseUrl || !supabaseSecretKey)
            return { error: { message: "supabase credentials are not provided"} };
        
        const cookieStore = cookies()
        const supabase = createServerClient(
            supabaseUrl,
            supabaseSecretKey,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    }
                }
            }
        )

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if(userError){
            throw userError
        } 

      const { data, error } =  await supabaseServer.from("tweets").insert({
            user_id: userData.user.id,
            text: tweet.toString(),
            id: randomUUID()
        })

        console.log(data, error);
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
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ComposeTweet