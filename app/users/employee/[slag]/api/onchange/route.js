import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function POST(res) {
    const data = await res.json();
    data.data.map(async (item) => {
        // console.log("hee");
        // console.log(item);
        const db = await connectDB();
        const temp = await db.execute("update `order` set order_status = ? where order_id = ?;",
            [item.order_status, item.order_id]);
        await db.end();
    })

    if (data.data.every(item => item.order_status === 1)) {
        console.log("oo");
        const db = await connectDB();
        const temp = await db.execute("update purchase_order set status = ? where po_id = ?;",
        [1,data.data[0].purchase_order_po_id]);
        await db.end();
    }else{
        const db = await connectDB();
        const temp = await db.execute("update purchase_order set status = ? where po_id = ?;",
        [0,data.data[0].purchase_order_po_id]);
        await db.end();
    }
    return NextResponse.json({ok:"ok"})
}