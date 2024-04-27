'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

export default function Product(value) {
    const { productId } = value;

    const [product, setProduct] = useState([])
    const [image, setImage] = useState('')


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/api/getproduct`, {
                    value: productId,
                });
                setProduct(response.data)

                const arrayBuffer = response.data.p_image.data;
                const uint8Array = new Uint8Array(arrayBuffer);
                const buffer = Buffer.from(uint8Array);
                const base64String = buffer.toString('base64');

                setImage(base64String)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // เรียกใช้ fetchData ทุกๆ 3 วินาที
        const interval = setInterval(fetchData, 3000);

        return () => {
            clearInterval(interval); // เมื่อ component unmount ให้หยุดการเรียก fetchData
        };
    }, [])
    // console.log(product.p_image.data);
    return (
        <div>
            <div className="mt-5">
                <p className='text-2xl font-bold'>ชื่อสินค้า:
                    {image && (
                        <img src={`data:image/png;base64,${image}`} alt="Uploaded Image" />
                    )}
                </p>
            </div>
            <div className="mt-5">
                <p className='text-2xl font-bold'>ชื่อสินค้า: {product.p_id}</p>
            </div>
            <div className="mt-5">
                <p className='text-2xl font-bold'>สถานที่เก็บ: {product.p_name}</p>
            </div>
            <div className="mt-5">
                <p className='text-2xl font-bold'>จำนวน: {product.p_storage}</p>
            </div>
            <div className="mt-5">
                <p className='text-2xl font-bold'>จำนวน: {product.quantity}</p>
            </div>
        </div>
    );
}