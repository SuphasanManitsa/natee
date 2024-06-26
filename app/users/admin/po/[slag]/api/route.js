import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function POST(res) {
    const po_id = await res.json();
    const db = await connectDB();
    const [rows, fields] = await db.query("select p_id, p_name,`order`.quantity,order_status from `order` join product on `order`.product_p_id = product.p_id where purchase_order_po_id = ?;",
    [po_id.po_id]);
    await db.end();
    return NextResponse.json(rows)
}