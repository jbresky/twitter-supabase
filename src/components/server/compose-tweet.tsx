import { createServerClient } from "@supabase/ssr";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { SupabaseClient } from "@supabase/supabase-js";
import FormTweet from "../client/form-tweet";
import { revalidatePath } from "next/cache";

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
        revalidatePath('/')
        return { data, error}
    } 
  
    return (
        <FormTweet serverAction={submitTweet}/>
    )
}

export default ComposeTweet 