import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../supabase.types';

export type TweetType = Database["public"]["Tables"]["tweets"]["Row"] & {
    profiles: 
      Pick<Database["public"]["Tables"]["profiles"]["Row"],
        "full_name" | "username">
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!

const getTweets = async () => {
    if(supabaseUrl && supabaseSecretKey){
      const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey)
  
      return await supabaseServer
        .from("tweets")
        .select(
          `
        *,
          profiles (
            full_name,
            username
          )
      `)
      .returns<TweetType[]>()        
    }
  }

  export default getTweets