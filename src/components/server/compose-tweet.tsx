import { createServerClient } from "@supabase/ssr";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { SupabaseClient } from "@supabase/supabase-js";
import FormTweet from "../client/form-tweet";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/index";
import { tweets } from "@/lib/db/schema";

const ComposeTweet = () => {
    async function submitTweet(formData: FormData) {
        'use server';

        const tweet = formData.get("tweet");

        if (!tweet) return

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!

        new SupabaseClient(supabaseUrl, supabaseSecretKey)

        if (!supabaseUrl || !supabaseSecretKey)
            return { error: { message: "supabase credentials are not provided" } };

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

        if (userError) {
            throw userError
        }

        const res = await db
            .insert(tweets)
            .values({
                text: tweet.toString(),
                id: randomUUID(),
                profileId: userData.user.id
            })
            .returning()
            .catch(error => {
                console.log(error);
            })

        console.log(res);
        revalidatePath('/')
        return { data: res }
    }

    return (
        <FormTweet serverAction={submitTweet} />
    )
}

export default ComposeTweet 