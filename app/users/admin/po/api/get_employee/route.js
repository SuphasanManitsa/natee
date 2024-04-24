import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET(request) {
    const db = await connectDB();
    const [rows, fields] = await db.query("select emp_id,emp_name from employee where role_detail_role_id = 2;")
    await db.end();
    return NextResponse.json(rows)
}