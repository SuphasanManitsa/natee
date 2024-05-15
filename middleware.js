import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

export async function middleware(request) {
    console.log("test middleware");
    const pathname = request.nextUrl.pathname;

    try {
        const token = request.cookies.get('token').value;
        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET
        }
        const secretKey = await importJWK(secretJWK, 'HS256');
        const { payload } = await jwtVerify(token, secretKey)

        const Redirect = () => {
            if (payload.role === '1') {
                return NextResponse.redirect(new URL("/users/admin", request.url));
            } else if (payload.role === '2') {
                return NextResponse.redirect(new URL("/users/employee", request.url)); // Corrected the URL path
            } else {
                return NextResponse.redirect(new URL("/", request.url)); // Simplified URL creation
            }
        };

        const authRoutes = ["/users/admin", "/users/employee"]; // Added missing routes


        // Check if the current route is not a redirected route
        if (!request.nextUrl.query && !!token && authRoutes.includes(pathname)) {
            // return Redirect();
        }

        if (
            (pathname.startsWith("/users/admin") && payload.role !== '1') ||
            (pathname.startsWith("/users/employee") && payload.role !== '2') ||
            (pathname === '/' && !!token)
        ) {
            return Redirect();
        }
    } catch (error) {
        console.log("error:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }

}

export const config = {
    matcher: [
        '/users/:path*',
        // '/',
    ],
};