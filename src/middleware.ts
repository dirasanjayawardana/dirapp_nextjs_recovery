import { NextResponse } from "next/server";

const allowedOrigin = ['https://www.dirapp.vercel.app', 'https://dirapp.vercel.app', 'http://localhost:5000', 'https://www.google.com', 'https://www.dirapp.cloud/', 'https://dirapp.cloud/']

export function middleware(req: Request) {

    // Mengecualikan path /api/login dan /api/register
    // if (req.url === '/api/login' || req.url === '/api/register') {
    //     return NextResponse.next();
    // }

    // Middleware Autentikasi
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Middleware Cors Allowed Origin
    const origin = req.headers.get('origin')
    if (origin && !allowedOrigin.includes(origin)) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/notes/:path*', '/api/tasks/:path*', '/api/users/:path*'],
}
