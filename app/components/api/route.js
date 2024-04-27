import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from 'jose';
import connectDB from "@/app/api/connectDB";

export async function POST(req) {
    const token = req.cookies._parsed.get('token').value
    const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET
    }
    const secretKey = await importJWK(secretJWK, 'HS256');
    const { payload } = await jwtVerify(token, secretKey)
    const db = await connectDB();
    try {
        const [results, temp] = await db.query(
            `select emp_username from employee where emp_id = ?;`,
            [payload.emp_id]
        );
        await db.end();
        return NextResponse.json({
            message: results[0].emp_username,
        });
        
        // if (results[0].role_detail_role_id == 1 || results[0].role_detail_role_id == 2) {
    }
    catch (err) {
        // console.log(err);
        return NextResponse.json({
            message: "fail",
        });
    }





    return NextResponse.json({
        message: "ok",
    });
}


// RequestCookies {
//     _parsed: Map(1) {
//         'token' => {
//             name: 'token',
//                 value: 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiMSIsImVtcF9pZCI6IkUwMDAxIiwiaWF0IjoxNzE0MjMzMjcxLCJleHAiOjE3MTQyNTEyNzF9.eK5wKdVpF9QH5FaGPV9UBjP7VtFOSiUXxoAB53Me490'
//         }
//     },
//     _headers: HeadersList {
//         cookies: null,
//             [Symbol(headers map)]: Map(22) {
//             'accept' => [Object],
//                 'accept-encoding' => [Object],
//                     'accept-language' => [Object],
//                         'connection' => [Object],
//                             'content-length' => [Object],
//                                 'content-type' => [Object],
//                                     'cookie' => [Object],
//                                         'host' => [Object],
//                                             'origin' => [Object],
//                                                 'referer' => [Object],
//                                                     'sec-ch-ua' => [Object],
//                                                         'sec-ch-ua-mobile' => [Object],
//                                                             'sec-ch-ua-platform' => [Object],
//                                                                 'sec-fetch-dest' => [Object],
//                                                                     'sec-fetch-mode' => [Object],
//                                                                         'sec-fetch-site' => [Object],
//                                                                             'sec-gpc' => [Object],
//                                                                                 'user-agent' => [Object],
//                                                                                     'x-forwarded-for' => [Object],
//                                                                                         'x-forwarded-host' => [Object],
//                                                                                             'x-forwarded-port' => [Object],
//                                                                                                 'x-forwarded-proto' => [Object]
//         },
//         [Symbol(headers map sorted)]: [
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array], [Array], [Array],
//             [Array]
//         ]
//     }
// }