import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET(request) {
    const db = await connectDB();
    const [rows, fields] = await db.query("SELECT * FROM purchase_order;")
    await db.end();
    return NextResponse.json(rows)
}