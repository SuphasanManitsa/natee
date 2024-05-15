'use server'
import connectDB from "@/app/api/connectDB";

export async function addemp(formData) {
  const nameemp = formData.get("nameemp")
  const useremp = formData.get("useremp")
  const passwordemp = formData.get("passwordemp")
  const roleemp = formData.get("roleemp")

  const db = await connectDB();

  const [emp_id, temp] = await db.query(`
    SELECT CONCAT('E', LPAD(SUBSTRING(emp_id, 2) + 1, 4, '0')) AS new_emp_id
    FROM employee
    ORDER BY emp_id DESC
    LIMIT 1;`);
  const rows = await db.execute(`
    INSERT INTO employee (emp_id, emp_name, emp_username, emp_password, role_detail_role_id)
    VALUES (?, ?, ?, ?, ?)
  `, [emp_id[0].new_emp_id, nameemp, useremp, passwordemp, roleemp]);

  await db.end();
}