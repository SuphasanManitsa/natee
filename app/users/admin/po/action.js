'use server'
import connectDB from "@/app/api/connectDB";

export async function po(formData) {
  const poid = formData.get("poid")
  const empid = formData.get("empid")
  const cid = formData.get("cid")

  const db = await connectDB();
  const rows = await db.execute(`
    INSERT INTO purchase_order (po_id, po_date, employee_emp_id, customers_c_id)
    VALUES (?, now(), ?, ?)
  `, [poid, empid, cid]);
  await db.end();
}