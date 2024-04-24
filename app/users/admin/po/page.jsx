'use client'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Link from 'next/link'
import axios from 'axios'

export default function page() {

    const [mydata, setMyData] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dataintable, setaDataintable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/api`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const newData = await response.json();
                setMyData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/api/get_customer`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const tempdata = await response.json();
                setCustomers(tempdata);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/api/get_employee`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const tempdata = await response.json();
                setEmployees(tempdata);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/api/get_product`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const tempdata = await response.json();
                setProduct(tempdata);
            } catch (error) {
                console.error("Error fetching data:", error);
            }


            // setTheArray(oldArray => [...oldArray, newElement]);
            // setQty(qty => [...qty, newElement]);
            // ทดสอบแสดงค่าข้อมูลใน console

            console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
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



    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const entries = [...formData.entries()];
        const data = Object.fromEntries(entries);
        // console.log('----');
        // console.log(data);
        // console.log("oooooooooooooo");
        // console.log(dataintable);
        // console.log("oooooooooooooo");
        // console.log({ data, product });
        // console.log('----');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/users/admin/po/api`,
                { key: [data, dataintable] }
            );
            const newData = await response.data;
            console.log(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleDelete = (rowId) => {
        console.log(rowId);
        setaDataintable(dataintable.filter((row) => row.p_id !== rowId));
    };

    const handleAdd = () => {
        console.log('come in');
        if (selectedProductId != '' && quantity != '') {
            setaDataintable(dataintable => [...dataintable, {
                p_id: selectedProductId,
                quantity: quantity,
            }]);
            console.log("lllllllllllllllllllll");
            console.log(dataintable);
            console.log("lllllllllllllllllllll");
        } else {
            console.log('heehee');
        }
    };

    const [selectedProductId, setSelectedProductId] = useState('P0001');
    const [quantity, setQuantity] = useState('');

    const handleChangeProductId = (event) => {
        setSelectedProductId(event.target.value);
    }

    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
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
                <table className="table table-zebra text-center mt-5" id='hee'>

                    <thead>
                        <tr>
                            <td className='font-bold text-xl'>ไอดี PO</td>
                            <td className='font-bold text-xl'>รหัสพนักงาน</td>
                            <td className='font-bold text-xl'>ชื้อพนักงาน</td>
                            <td className='font-bold text-xl'>รหัสลูกค้า</td>
                            <td className='font-bold text-xl'>ชื่อร้านค้า</td>
                            <td className='font-bold text-xl'>สเตตัส</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredData.map((data, index) => (
                                <tr key={index} className='text-center'>
                                    <td>{data.po_id}</td>
                                    <td>{data.employee_emp_id}</td>
                                    <td>{data.emp_name}</td>
                                    <td>{data.customers_c_id}</td>
                                    <td>{data.c_name}</td>
                                    <td className={`${data.status === 0 ? 'text-red-500' : data.status === 1 ? 'text-green-500' : ''}`}>
                                        {data.status === 0 ? 'ยังไม่เสร็จ' : data.status === 1 ? 'เสร็จแล้ว' : ''}
                                    </td>
                                    <td><Link className='btn btn-info text-white' href={`/users/admin/po/${data.po_id}`}>ดูข้อมูล</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <form onSubmit={onSubmit}>
                    <div className="grid grid-cols-2 justify-items-center gap-5">
                        <div className="grid grid-cols-2 justify-items-center gap-5">

                            <div className="mt-5">
                                <p className='text-2xl font-bold'>เลือกพนักงาน</p>
                                <select name="empid" className="select select-info w-full max-w-xs mt-3">
                                    <option disabled>เลือกพนักงาน</option>
                                    {
                                        employees.map((employee, index) => (
                                            <option key={index} value={employee.emp_id}>{employee.emp_name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mt-5">
                                <p className='text-2xl font-bold'>ร้านลูกค้า</p>
                                <select name="cid" className="select select-info w-full max-w-xs mt-3">
                                    <option disabled>เลือกลูกค้า</option>
                                    {
                                        customers.map((customers, index) => (
                                            <option key={index} value={customers.c_id}>{customers.c_name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 justify-items-center">
                            <p className='text-2xl font-bold mt-5'>ชื่อสินค้า</p>
                            <p className='text-2xl font-bold mt-5'>จำนวนสินค้า</p>

                            <select name="pid" className="select select-info w-full max-w-xs mt-3" value={selectedProductId} onChange={handleChangeProductId}>
                                <option disabled>เลือกสินค้า</option>
                                {
                                    product.map((product, index) => (
                                        <option key={index} value={product.p_id}>{product.p_name}</option>
                                    ))
                                }
                            </select>

                            <div className="mx-2 flex">
                                {/* ----------------- */}
                                <input name='qty' type="text" placeholder="จำนวน xx" className="input input-bordered input-info w-full max-w-xs mt-3" value={quantity} onChange={handleChangeQuantity} />

                                <div className="flex justify-end"><div className='btn btn-info text-2xl text-white mt-3 mx-2' onClick={handleAdd}> + </div></div>
                            </div>

                        </div>

                    </div>
                    <div className="w-full h-96 overflow-y-auto">
                        <table className='table table-zebra text-center mt-5' id="hee2">
                            <thead>
                                <tr>
                                    <td className="text-2xl font bold">ID สินค้า</td>
                                    <td className="text-2xl font bold">ชื่อสินค้า</td>
                                    <td className="text-2xl font bold">จำนวน</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    dataintable.map((list, index) => (
                                        <tr key={index}>
                                            <td className="text-xl font bold">{list.p_id}</td>
                                            <td className="text-xl font bold">{list.p_name}</td>
                                            <td className="text-xl font bold">{list.quantity}</td>
                                            <td>
                                                <button className='btn btn-info text-2xl text-white' type='button' onClick={() => handleDelete(list.p_id)}>ลบ</button>
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <button type='submit' className='btn btn-info text-white mt-5 w-full' onClick={handleClick}>ส่ง</button>
                </form>
            </div>


            <div className="flex justify-center">
                <Link href="../admin"><button className='btn btn-info my-5 text-white px-40'>ย้อนกลับ</button></Link>
            </div>

        </div>
    )
}