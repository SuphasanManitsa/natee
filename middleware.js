import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;

    try {
        const token = request.cookies.get('token').value;
        const secretJWK = {
            kty: 'oct',
            k: process.env.JOSE_SECRET
        }
        const secretKey = await importJWK(secretJWK, 'HS256');
        const { payload } = await jwtVerify(token, secretKey)

        console.log(payload.role + "_sssss");
        console.log(payload.role === '1');
        console.log(typeof payload.role); // Removed unnecessary parentheses

        const Redirect = () => {
            console.log('now');
            if (payload.role === '1') {
                console.log("is admin");
                return NextResponse.redirect(new URL("/users/admin", request.url));
            } else if (payload.role === '2') {
                console.log("is employee");
                return NextResponse.redirect(new URL("/users/employee", request.url)); // Corrected the URL path
            } else {
                console.log("no ok");
                return NextResponse.redirect(new URL("/", request.url)); // Simplified URL creation
            }
        };

        const authRoutes = ["/users/admin", "/users/employee"]; // Added missing routes


        // Check if the current route is not a redirected route
        if (!request.nextUrl.query && !!token && authRoutes.includes(pathname)) {
            console.log("hee");
            // return Redirect();
        }

        if (
            (pathname.startsWith("/users/admin") && payload.role !== '1') ||
            (pathname.startsWith("/users/employee") && payload.role !== '2') ||
            (pathname === '/' && !!token)
        ) {
            console.log(pathname, payload.role);
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