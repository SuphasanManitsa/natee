'use server'
import connectDB from "@/app/api/connectDB";

export async function addemp(formData) {
  const idemp = formData.get("idemp")
  const nameemp = formData.get("nameemp")
  const useremp = formData.get("useremp")
  const passwordemp = formData.get("passwordemp")
  const roleemp = formData.get("roleemp")
  
  const db = await connectDB();

  const rows = await db.execute(`
    INSERT INTO employee (emp_id, emp_name, emp_username, emp_password, role_detail_role_id)
    VALUES (?, ?, ?, ?, ?)
  `, [idemp, nameemp, useremp, passwordemp, roleemp]);

  await db.end();
}