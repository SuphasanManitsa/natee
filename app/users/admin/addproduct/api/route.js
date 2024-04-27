import { NextResponse } from "next/server";
import connectDB from "@/app/api/connectDB";
// import { decode } from 'base64-arraybuffer';

export async function POST(req) {
  const request = await req.json();
  // console.log(request.image);
  // console.log(request.formData);
  try {
    const base64Data = request.image.split(';base64,')[1];
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const imageData = Buffer.from(base64Image, 'base64');



    const db = await connectDB();
    const [p_id, temps] = await db.query(`SELECT CONCAT('P', LPAD(SUBSTRING(p_id, 2) + 1, 4, '0')) AS p_id
    FROM product
    ORDER BY p_id DESC
    LIMIT 1;`);

    const temp = await db.execute('INSERT INTO product (p_id,p_name,p_storage,quantity,p_image) VALUES (?,?,?,?,?);',
    [p_id[0].p_id,request.formData.p_name,request.formData.p_storage,request.formData.quantity,imageData]);
    
    await db.end();
    
    console.log("gggggggggggggggggggggggggggggggggggggggggggggg");

    return NextResponse.json({ OK: "OK" })
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
}
