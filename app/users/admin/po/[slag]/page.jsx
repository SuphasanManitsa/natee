'use client'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import axios from 'axios'
import { io } from 'socket.io-client';

const socket = io();

export default function page({ params }) {
    const [mydata, setMyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    async function fetchData() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/[slag]/api`, {
                po_id: params.slag,
            });
            const newData = response.data;
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
                            <th className='font-bold text-xl'>ชื่่อสินค้า</th>
                            <th className='font-bold text-xl'>จำนวนสินค้า</th>
                            <th className='font-bold text-xl'>สเตตัส</th>
                            <td className='font-bold text-xl'>รายละเอียด</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mydata.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.p_name}</td>
                                    <td>{data.quantity}</td>
                                    <td className={`${data.order_status === 0 ? 'text-red-500' : data.order_status === 1 ? 'text-green-500' : ''}`}>
                                        {data.order_status === 0 ? 'ยังไม่เสร็จ' : data.order_status === 1 ? 'เสร็จแล้ว' : ''}
                                    </td>
                                    <td><Link className='btn btn-info text-white' href={`/users/admin/po/${params.slag}/${data.p_id}`}>ดูข้อมูล</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}