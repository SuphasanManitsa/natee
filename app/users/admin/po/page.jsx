'use client'
import React , { useState, useEffect} from 'react'
import { po } from './action'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function page() {

    const [mydata, setMyData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/admin/po/api");
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
        <div className='container'>
            <p className='text-4xl my-3 font-bold'>ใบ po</p>
            <hr />

            <div className="mt-5">
                <p className='text-3xl font-bold mb-5'>รายละเอียดข้อมูลต่างๆ</p>
                ใส่สิ่งที่ต้องการเช็ค : <input
                    className='input input-bordered input-info w-full max-w-xs'
                    type="text"
                    placeholder="ค้นหาใบ PO"
                    onChange={handleSearch}
                />
            </div>

            <div className="w-full h-96 overflow-y-auto">
                <table className="table table-zebra text-center mt-5">

                    <thead className=''>
                        <tr>
                            <th className='font-bold text-xl'>ไอดี PO</th>
                            <th className='font-bold text-xl'>เวลาที่สั่ง</th>
                            <th className='font-bold text-xl'>รหัสพนักงาน</th>
                            <th className='font-bold text-xl'>รหัสลุกค้า</th>
                            <th className='font-bold text-xl'>สเตตัส</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            filteredData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.po_id}</td>
                                    <td>{data.po_date}</td>
                                    <td>{data.employee_emp_id}</td>
                                    <td>{data.customers_c_id}</td>
                                    <td>{data.status === 0 ? 'ยังไม่เสร็จ' : data.status === 1 ? 'เสร็จแล้ว' : ''}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>

            <form action={po}>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>ใบ PO ที่ </p> <input name='poid' type="text" placeholder="xx" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>เลือกพนักงาน</p>
                    <select name="empid" className="select select-info w-full max-w-xs mt-3">
                        <option disabled>เลือกพนักงาน</option>
                        <option value="E0001">Topfee</option>
                        <option value="E0002">Natee</option>
                        <option value="E0003">Mhuy</option>
                        <option value="E0004">Ake</option>
                        <option value="E0005">Grid</option>
                        <option value="E0006">Zack</option>
                    </select>
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>ร้านลูกค้า</p>
                    <select name="cid" className="select select-info w-full max-w-xs mt-3">
                        <option disabled>เลือกลูกค้า</option>
                        <option value="C00001">Akako</option>
                        <option value="C00002">Sushi Hiro Warehouse</option>
                        <option value="C00003">Kabocha Ratchapruek</option>
                        <option value="C00004">Kozue Ratchapruek</option>
                        <option value="C00005">Namerou Sushi</option>
                        <option value="C00006">Izakaya Sushi</option>
                        <option value="C00007">Kuuya</option>
                        <option value="C00008">Mezzaluna</option>
                        <option value="C00009">Kabocha Rama2</option>
                        <option value="C00010">Kabocha Rama3</option>
                        <option value="C00011">Kabocha thenine</option>
                        <option value="C00012">Tora Sushi Ratchapruek</option>
                        <option value="C00013">Tora Sushi phran-nok</option>
                        <option value="C00014">Sushi Seki ngamwongwan</option>
                        <option value="C00015">Sushi Seki ladpraw</option>
                        <option value="C00016">Hanaya</option>
                        <option value="C00017">BuddyBKK</option>
                        <option value="C00018">Fatboy</option>
                        <option value="C00019">W Omakase</option>
                        <option value="C00020">Kozue omakase Thonglor</option>
                        <option value="C00021">Yuzu ramen iconsiam</option>
                        <option value="C00022">Yuzu suki iconsiam</option>
                        <option value="C00023">Ryuzu Omakase</option>
                        <option value="C00024">Hagetsu</option>
                        <option value="C00025">Kittisack</option>
                    </select>
                </div>
                <button type='submit' className='btn btn-info text-white mt-5' onClick={handleClick}>ส่ง</button>
            </form>
            <div className="flex justify-center">
                <Link href="../admin"><button className='btn btn-info my-5 text-white px-40'>ย้อนกลับ</button></Link>
            </div>

        </div>
    )
}
