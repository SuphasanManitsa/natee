'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

export default function Product(value) {
    const { productId } = value;

    const [product, setProduct] = useState([])
    const [base64String, setBase64String] = useState('')


    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/api/getproduct`, {
                    value: productId,
                });
                console.log(response.data);
                console.log(response.data.p_image.data);
                const hee = response.data.p_image.data.toString('base64');
                console.log(`data:image/png;base64,${hee}`);
                // setImage(response.data.p_image.data)
                // const blob = new Blob([new Uint8Array(response.data.p_image.data)], { type: 'image/png' });
                // const imageUrl = URL.createObjectURL(blob);
                // console.log(imageUrl);













                // const blob = new Blob([new Uint8Array(response.data.p_image.data)], { type: 'image/png' });
                // // Create a URL for the Blob object
                // const imageUrl = URL.createObjectURL(blob);

                // // Update state with the image URL
                // setImage(imageUrl);

                // const reader = new FileReader();
                // reader.readAsDataURL(response.data.p_image);
                // reader.onloadend = () => {
                //     const base64Data = reader.result;
                //     console.log(base64Data);
                //     setBase64Data(base64Data);
                //     // Use the base64Data in your JSX
                // };
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
                {/* {image && <img src={`data:image/png;base64,${Buffer.from(image).toString('base64')}`} alt="Product Image" />}
            {`data:image/png;base64,${Buffer.from(image).toString('base64')}`} */}
            <img src={base64String} alt="sdf" />
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