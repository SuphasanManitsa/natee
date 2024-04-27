'use client'
import { useEffect, useState } from "react";
import { logout } from "./action";
import axios from "axios";

export default function Logout() {
    const [username, setUsername] = useState('')
    async function fetchData() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/components/api`,
                {
                    hee: 'hee',
                });
            setUsername(response.data.message)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex justify-end me-5 gap-5" >
            <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mt-4 py-2 px-4 items-center rounded-md">{username}</div>
            <form action={logout}>
                <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mt-4 py-2 px-4 items-center rounded-md'>Logout</button>
            </form>
        </div>
    );
}