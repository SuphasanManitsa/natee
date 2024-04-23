'use server'
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET() {
    cookies().delete('token', {
        path: '/'
    });
    console.log("i can't delete cookie");
    return NextResponse.json({
        message: "false",
    });
}