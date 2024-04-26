'use client'
import React, { useState } from 'react'
import axios from 'axios';

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
            .then(response => {
                console.log(response.data);
                // Handle success, maybe show a success message
            })
            .catch(error => {
                console.error("Error uploading image: ", error);
                // Handle error, maybe show an error message
            });
    }

    return (
        <div className="auth-wrapper">
            <form onSubmit={uploadImage}>
                <div className="auth-inner" style={{ width: "auto" }}>
                    Let's Upload Image <br />
                    <input
                        accept="image/*"
                        type="file"
                        onChange={convertToBase64}
                    />
                </div>
                {image ? <img width={100} height={100} src={image} alt="Uploaded" /> : null}
                <div className="mt-5">
                    <p className='text-2xl font-bold'>ชื่อสินค้า :</p> <input type="text" name="p_name" placeholder="นทีเทพซ่า" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>สถานที่เก็บ :</p> <input type="text" name="p_storage" placeholder="Natee" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>
                <div className="mt-5">
                    <p className='text-2xl font-bold'>จำนวน :</p> <input type="password" name="quantity" placeholder="1234" className="mt-3 input input-bordered input-info w-full max-w-xs" />
                </div>

                <button type='submit' className='btn btn-info text-white mt-5'>ส่ง</button>
                <button type='reset' className='btn btn-info text-white mx-5'>reset</button>
            </form>



        </div>
    )
}
