import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";
import { jwtVerify, importJWK } from 'jose';
import { cookies } from 'next/headers'
export async function GET() {
    const cookieStore = cookies()
    const token = cookieStore.get('token').value
    const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET
    }
    const secretKey = await importJWK(secretJWK, 'HS256');
    const { payload } = await jwtVerify(token, secretKey)

    const db = await connectDB();
    const [rows, fields] = await db.query("select po_id,c_name,`status` from purchase_order join customers on purchase_order.customers_c_id = customers.c_id where employee_emp_id = ?;",
    [payload.emp_id]);
    await db.end();
    return NextResponse.json(rows)
}