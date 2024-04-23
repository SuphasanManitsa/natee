'use server'
import { redirect } from 'next/navigation'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function login(prevState,formData) {
    const rawFormData = {
        username: formData.get('username'),
        password: formData.get('password'),
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_IP}/api/login`, rawFormData)
    
    if (response.data.massess != "fail") {
        cookies().set('token',response.data.massess)
        redirect('/users/admin')

    }
    else {
        return {massage: 'username or password not correct'}
    }
}