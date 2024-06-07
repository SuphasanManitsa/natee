'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { io } from 'socket.io-client';

const socket = io();

export default function page() {
    const [mydata, setMyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function fetchData() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_IP}/users/employee/api`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const newData = await response.json();
            setMyData(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
        socket.on("receive_employee", (message) => {
            fetchData();
          });
          return () => {
            socket.off("receive_employee");
          };
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredData = mydata.filter((data) => {
        return Object.values(data).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                            <th className='font-bold text-xl'>รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.po_id}</td>
                                    <td>{data.c_name}</td>
                                    <td className={`${data.status === 0 ? 'text-red-500' : data.status === 1 ? 'text-green-500' : ''}`}>
                                        {data.status === 0 ? 'ยังไม่เสร็จ' : data.status === 1 ? 'เสร็จแล้ว' : ''}
                                    </td>
                                    <td><Link className='btn btn-info text-white' href={`/users/employee/${data.po_id}`}>ดูข้อมูล</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}
