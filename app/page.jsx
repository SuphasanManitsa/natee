'use client'
import { login } from './action';
import { useFormState } from 'react-dom';
import Logout from '@/app/components/logout'
import { redirect } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation'

export default function Page() {
    try {
         const router = useRouter()
        const cookies = useCookies();
        if (cookies.get('token') != null) {
            console.log('hgjhjhjhj');

            router.push('/users/admin')
        }
    } catch (error) {
        console.log(error);
    }
    const initState = {
        massage: ''
    }
    const [state, formAction] = useFormState(login, initState);
    return (
        <div className="bg-yellow-400">
            <div className='flex justify-center flex-col items-center min-h-screen'>
                <form action={formAction} className='flex flex-col'>
                    <div className='text-center mb-10 text-6xl'>Login !!</div>
                    Username <input name="username" />
                    Password <input name="password" />
                    <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold mt-4 py-2 px-4 items-center rounded-md'>Submit</button>
                </form>
                <div className='text-red-600'>
                    {state.massage}
                </div>
                <Logout />
            </div>
        </div>
    );
}