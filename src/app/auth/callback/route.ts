// import { type NextRequest, NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// import type { Database } from "@/lib/supabase.types";
// export const dynamic = 'force-dynamic'

// export async function GET(request: NextRequest) {
//     const requestUrl = new URL(request.url)
//     const code = requestUrl.searchParams.get('code')
  
//     if (code) {
//       const cookieStore = cookies()
//       const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
//       await supabase.auth.exchangeCodeForSession(code)
//     }
  
//     return NextResponse.redirect(requestUrl.origin)
//   }

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(new URL(`/${next.slice(1)}`, request.url))
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
}