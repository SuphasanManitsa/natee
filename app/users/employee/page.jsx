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
                const response = await fetch("http://localhost:3000/users/employee/api");
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

                    <thead>
                        <tr>
                            <th className='font-bold text-xl'>ไอดีใบ PO</th>
                            <th className='font-bold text-xl'>ชื่อลูกค้า</th>
                            <th className='font-bold text-xl'>สเตตัส</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <Link href={`/users/employee/${index + 1}`}>
                                        <td>{data.po_id}</td>
                                        <td>{data.c_name}</td>
                                        <td>{data.status === 0 ? 'ยังไม่เสร็จ' : data.status === 1 ? 'เสร็จแล้ว' : ''}</td>
                                    </Link>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>



            <form action={addemp}>
                <button type='submit' className='btn btn-info text-white mt-5' onClick={handleClick}>ส่ง</button>
                <button type='reset' className='btn btn-info text-white mx-5'>reset</button>
            </form>
            <div className="flex justify-center">
                <Link href="../admin"><button className='btn btn-info my-5 text-white px-40'>ย้อนกลับ</button></Link>
            </div>
        </div>
    )
}
