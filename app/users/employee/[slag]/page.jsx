'use client'
import React, { useState, useEffect } from 'react'
import { addemp } from './action'
import Swal from 'sweetalert2'
import Link from 'next/link'
import axios from 'axios'

export default function page({ params }) {
    const [mydata, setMyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log("asssssssdsdsdsdsdsdsdsd");
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/users/employee/[slag]/api`, {
                    po_id: params.slag,
                });
                const newData = response.data
                console.log(newData);
                console.log("plplplplplplplplplplplpl");
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

    const handleClick = () => {
        Swal.fire({
            title: 'ส่งสำเร็จ!',
            text: 'กด OK เพื่อดำเนินการต่อ',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    }

    async function handleClickCheckbox(index, orderStatus) {
        const newData = [...mydata]; // สร้างข้อมูลใหม่จากข้อมูลเดิม
        newData[index].order_status = orderStatus === 1 ? 0 : 1; // สลับค่า order_status
        setMyData(newData); // อัปเดตข้อมูลใหม่ใน state

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/users/employee/[slag]/api/onchange`, {
                data: mydata,
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    };

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
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.map((data, index) => (
                            <tr key={index} className='text-center'>
                                <td>{data.p_name}</td>
                                <td>{data.quantity}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={data.order_status === 1}
                                        onChange={() => handleClickCheckbox(index, data.order_status)}
                                    />
                                </td>
                            </tr>
                        ))}
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