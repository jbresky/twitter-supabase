import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import FormTweet from "../client/form-tweet";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db/index";
import { tweets } from "@/lib/db/schema";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

interface IComposeTweet {
    placeholder?: string,
    userAvatar: string
}

const ComposeTweet = ({ placeholder, userAvatar }: IComposeTweet ) => {
    async function submitTweet(formData: FormData) {
        'use server';

        const tweet = formData.get("tweet");

        if (!tweet) return

        const supabase = createServerActionClient({ cookies })

        const { data: { user } } = await supabase.auth.getUser()
        
        if(!user) return

        const res = await db
            .insert(tweets)
            .values({
                text: tweet.toString(),
                id: randomUUID(),
                profileId: user.id
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
        <FormTweet
        userAvatar={userAvatar}
        serverAction={submitTweet} placeholder={placeholder} />
    )
}

export default ComposeTweet 