'use client'
import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function page() {
    const [image, setImage] = useState("");

    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.error("Error: ", error);
        };
    }

    function uploadImage(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        axios.post(`${process.env.NEXT_PUBLIC_IP}/users/admin/addproduct/api`, { image: image, formData: object })
            .catch(error => {
                console.error("Error uploading image: ", error);
                // Handle error, maybe show an error message
            });
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
        <div className="auth-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={uploadImage} style={{ width: "auto" }}>
                <div className="auth-inner">
                    Let's Upload Image <br />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    {image ? <img width={100} height={100} src={image} alt="Uploaded" /> : null}
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>ชื่อสินค้า :</p> <input type="text" name="p_name" placeholder="XXX" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>สถานที่เก็บ :</p> <input type="text" name="p_storage" placeholder="XXX" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>จำนวน :</p> <input min="0" type="number" name="quantity" placeholder="XXXX" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <button type='submit' className='btn btn-info text-white mr-5' onClick={handleClick}>ส่ง</button>
                    <button type='reset' className='btn btn-info text-white'>รีเซ็ต</button>
                </div>
            </form>
        </div>
    )
}