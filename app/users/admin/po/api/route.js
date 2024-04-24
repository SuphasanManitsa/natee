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
  // console.log(request.key);
  const DB = await connectDB();
  const [poid, temp] = await DB.query(`select po_id + 1 as po_id from purchase_order order by po_id desc limit 1;`);
  // console.log(poid[0].po_id);

  const ok = await DB.execute(`INSERT INTO purchase_order (po_id, po_date, employee_emp_id, customers_c_id,status)
    VALUES (?, now(), ?, ?,?)
  `, [poid[0].po_id, request.key[0].empid, request.key[0].cid, 0]);
  await DB.end();


  for (let index = 0; index < request.key[1].length; index++) {
    const DB = await connectDB();
    
    const [order_id, temp] = await DB.query('select order_id + 1 as order_id from `order` order by order_id desc limit 1;');
    
    console.log([order_id[0].order_id, request.key[1][index].p_id, poid[0].po_id, request.key[1][index].quantity, 0]);
    
    const rows = await DB.execute('INSERT INTO `order` (order_id,product_p_id,purchase_order_po_id,quantity,order_status) VALUES(?,?,?,?,?);',
      [order_id[0].order_id, request.key[1][index].p_id, poid[0].po_id, request.key[1][index].quantity, 0]);
    console.log("ok");
    
    await DB.end();

  }

  // return NextResponse.json(rows)
  return NextResponse.json({ OK: "OK" })
}