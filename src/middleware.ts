import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    if (request.cookies.has('registered')) {
        return NextResponse.redirect(new URL('/registered', request.url));
    }

    return NextResponse.next();
}