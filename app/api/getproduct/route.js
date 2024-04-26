import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function POST(req) {
    const request = await req.json();
    const db = await connectDB();

    try {
        const [results, temp] = await db.query(`select * from product where p_id = ?;`,[request.value]);
        await db.end();
        return NextResponse.json(results[0]);
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({massage: 'error'});
    }
}