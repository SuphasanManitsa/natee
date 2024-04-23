'use client'
import { logout } from "./action";

export default function Logout() {
    return (
        <form action={logout}>
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mt-4 py-2 px-4 items-center rounded-md'>Logout</button>
        </form>
    );
}