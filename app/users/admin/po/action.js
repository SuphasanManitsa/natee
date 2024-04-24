'use server'
import connectDB from "@/app/api/connectDB";

export async function po(formData) {
  const empid = formData.get("empid")
  const cid = formData.get("cid")

  const db = await connectDB();
  const [poid,temp] = await db.query(`select po_id + 1 as po_id from purchase_order order by po_id desc limit 1;`);
  console.log(poid[0].po_id);

  const rows = await db.execute(`INSERT INTO purchase_order (po_id, po_date, employee_emp_id, customers_c_id,status)
    VALUES (?, now(), ?, ?,?)
  `, [poid[0].po_id, empid, cid,0]);
  await db.end();
}