import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";
import { SignJWT, importJWK } from 'jose';
import { cookies } from 'next/headers';

export async function POST(req) {
    const { username, password } = await req.json();

    const db = await connectDB();

    try {
        const [results, temp] = await db.query(
            `select role_detail_role_id from employee where emp_username = ? and emp_password = ?;`,
            [username, password]
        );
        await db.end();
        if (results[0].role_detail_role_id == 1 || results[0].role_detail_role_id == 2) {
            const secretJWT = {
                kty: 'oct',
                k: process.env.JOSE_SECRET
            }
            const secretKey = await importJWK(secretJWT, 'HS256')
            const token = await new SignJWT({ role: results[0].role_detail_role_id })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1h')
                .sign(secretKey)
            cookies().set('token',token)
            console.log(token);
            return NextResponse.json({
                massess: token,
            });
        } else {
            return NextResponse.json({
                message: "fail",
            });
        }
    }
    catch (err) {
        // console.log(err);
        return NextResponse.json({
            message: "fail",
        });
    }
}