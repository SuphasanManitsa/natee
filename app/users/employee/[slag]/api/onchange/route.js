import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function POST(res) {
    const data = await res.json();
    const db = await connectDB();
    data.data.map(async (item) => {
        const temp = await db.execute("update `order` set order_status = ? where order_id = ?;",
        [item.order_status, item.order_id]);
    })
    if (data.data.every(item => item.order_status === 1)) {
        // const DB = await connectDB();
        const temp = await db.execute("update purchase_order set status = ? where po_id = ?;",
        [1,data.data[0].po_id]);
        // await DB.end();
    }else{
        // const Db = await connectDB();
        const temp = await db.execute("update purchase_order set status = ? where po_id = ?;",
        [0,data.data[0].po_id]);
        // await Db.end();
    }
    await db.end();
    return NextResponse.json({ok:"ok"})
}