import { NextResponse, type NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/supabase"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  if (!req.nextUrl.pathname.startsWith("/login")) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      return res
    } else {
      const url = req.nextUrl.clone()
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
