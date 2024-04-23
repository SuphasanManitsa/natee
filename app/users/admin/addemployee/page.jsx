'use client'
import React, { useState, useEffect } from 'react'
import { addemp } from './action'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function page() {
    const [mydata, setMyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/admin/addemployee/api");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const newData = await response.json();
                setMyData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // เรียกใช้ fetchData ทุกๆ 3 วินาที
        const interval = setInterval(fetchData, 3000);

        return () => {
            clearInterval(interval); // เมื่อ component unmount ให้หยุดการเรียก fetchData
        };
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredData = mydata.filter((data) => {
        return Object.values(data).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleClick = () => {
        Swal.fire({
            title: 'ส่งสำเร็จ!',
            text: 'กด OK เพื่อดำเนินการต่อ',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    return (
        <div className="container">
            <p className='text-4xl my-3  font-bold'>การจัดการข้อมูลพนักงาน</p>
            <hr />
            <div className="mt-5">
                <p className='text-3xl font-bold mb-5'>รายละเอียดข้อมูลต่างๆ</p>
                ใส่สิ่งที่ต้องการเช็ค : <input
                    className='input input-bordered input-info w-full max-w-xs'
                    type="text"
                    placeholder="ค้นหาพนักงาน"
                    onChange={handleSearch}
                />
            </div>

            <div className="w-full h-96 overflow-y-auto">
                <table className="table table-zebra text-center mt-5">

                    <thead className=''>
                        <tr>
                            <th className='font-bold text-xl'>ไอดีพนักงาน</th>
                            <th className='font-bold text-xl'>ชื่อพนักงาน</th>
                            <th className='font-bold text-xl'>username</th>
                            <th className='font-bold text-xl'>password</th>
                            <th className='font-bold text-xl'>ตำแหน่ง</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.emp_id}</td>
                                    <td>{data.emp_name}</td>
                                    <td>{data.emp_username}</td>
                                    <td>{data.emp_password}</td>
                                    <td>{data.role_detail_role_id}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>


            <p className='text-3xl my-3 font-bold mt-5'>เพิ่มพนักงาน</p>
            <hr />
            <form action={addemp}>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>รหัสพนักงาน :</p> <input type="text" name="idemp" placeholder="ใส่รหัสพนักงาน E0000" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>ชื่อพนักงาน :</p> <input type="text" name="nameemp" placeholder="นทีเทพซ่า" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>username :</p> <input type="text" name="useremp" placeholder="Natee" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>password :</p> <input type="password" name="passwordemp" placeholder="1234" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>คำแหน่งพนักงาน :</p>
                    <select name="roleemp" className="select select-info w-full max-w-xs mt-3">
                        <option disabled>เลือกตำแหน่ง</option>
                        <option value="1">แอดมิน</option>
                        <option value="2">สมาชิกยกของ</option>

                    </select>
                </div>
                <button type='submit' className='btn btn-info text-white mt-5' onClick={handleClick}>ส่ง</button>
                <button type='reset' className='btn btn-info text-white mx-5'>reset</button>
            </form>
            <div className="flex justify-center">
                <Link href="../admin"><button className='btn btn-info my-5 text-white px-40'>ย้อนกลับ</button></Link>
            </div>
        </div>
    )
}
