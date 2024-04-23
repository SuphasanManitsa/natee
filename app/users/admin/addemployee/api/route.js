import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET(){
    const db = await connectDB();
    const [rows,fields] = await db.query("SELECT * FROM employee;")
    await db.end();
    return NextResponse.json(rows)
}