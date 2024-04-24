import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET(request) {
    const db = await connectDB();
    const [rows, fields] = await db.query("select po_id,po_date,employee_emp_id,emp_name,customers_c_id,c_name,`status` from purchase_order join employee on purchase_order.employee_emp_id = employee.emp_id join customers on purchase_order.customers_c_id = customers.c_id;")
    await db.end();
    return NextResponse.json(rows)
}