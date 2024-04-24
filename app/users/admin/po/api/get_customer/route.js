import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET() {
    const db = await connectDB();
    const [rows, fields] = await db.query("select c_id,c_name from customers")
    await db.end();
    return NextResponse.json(rows)
}