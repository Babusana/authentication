import { NextResponse } from 'next/server'
export function middleware(request) {
  const path = request.nextUrl.pathname
  const publicPath = path === '/login' || path === '/register'
  const token = request.cookies.get('token')?.value || "";
  //Checking if it is public path and the user had token or not
  if (path !== "/login" && path !== "/register") {
    if (publicPath && token) {
      return NextResponse.redirect(new URL(path, request.nextUrl))
    }

  }
      if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
      }
  // return NextResponse.redirect(new URL('/home', request.nextUrl))
}
export const config = {
  matcher: ["/login","/register","/profile","/profile/:path*"],
}