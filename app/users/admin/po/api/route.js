import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";

export async function GET() {
  const db = await connectDB();
  const [rows, fields] = await db.query("select po_id,po_date,employee_emp_id,emp_name,customers_c_id,c_name,`status` from purchase_order join employee on purchase_order.employee_emp_id = employee.emp_id join customers on purchase_order.customers_c_id = customers.c_id;")
  await db.end();
  return NextResponse.json(rows)
}

export async function POST(req) {
  const request = await req.json();
  const DB = await connectDB();
  const [poid, temp] = await DB.query(`SELECT COALESCE(MAX(po_id) + 1, 1) AS po_id FROM purchase_order;`);

  
  const ok = await DB.execute(`INSERT INTO purchase_order (po_id, po_date, employee_emp_id, customers_c_id,status)
  VALUES (?, now(), ?, ?,?)
  `, [poid[0].po_id, request.key[0].empid, request.key[0].cid, 0]);
  await DB.end();


  for (let index = 0; index < request.key[1].length; index++) {
    const DB = await connectDB();
    
    const [order_id, temp] = await DB.query('SELECT COALESCE(MAX(order_id) + 1, 1) AS order_id FROM `order`;');
    
    const rows = await DB.execute('INSERT INTO `order` (order_id,product_p_id,purchase_order_po_id,quantity,order_status) VALUES(?,?,?,?,?);',
    [order_id[0].order_id, request.key[1][index].p_id, poid[0].po_id, request.key[1][index].quantity, 0]);

    const rowseiei = await DB.execute('update product set quantity = quantity - ? where p_id = ?;',
      [request.key[1][index].quantity, request.key[1][index].p_id]);


    await DB.end();

  }

  return NextResponse.json({ OK: "OK" })
}