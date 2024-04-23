import React from 'react'
import Link from 'next/link'

export default function page() {
    return (
        <div className="container">
            <p className='text-4xl font-bold mt-5'>Role Admin</p>
            <hr />
            <div className="mt-5 grid grid-cols-2 gap-5 justify-items-center">
                <button>
                    <Link href="./admin/addemployee">
                        <div className="bg-slate-200 card w-96 shadow-xl border border-black hover:shadow-2xl hover:bg-transparent duration-150">
                            <figure>
                                <div className="w-56 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" /></svg>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-center font-bold">
                                    เพิ่มพนักงาน
                                </h2>
                            </div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link href="./admin/po">
                        <div className="bg-slate-200 card w-96 shadow-xl border border-black hover:shadow-2xl hover:bg-transparent duration-150">
                            <figure>
                                <div className="w-56 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z" /></svg>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-center font-bold">
                                    ใบ PO
                                </h2>
                            </div>
                        </div>
                    </Link>
                </button>

                <button>
                    <Link href="./admin/addproduct">
                        <div className="bg-slate-200 card w-96 shadow-xl border border-black hover:shadow-2xl hover:bg-transparent duration-150">
                            <figure>
                                <div className="w-56 p-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M326.2 36c-4-1.7-8.4-1.7-12.4 0L51.6 146.4C39.7 151.4 32 163 32 175.9V496c0 8.8-7.2 16-16 16s-16-7.2-16-16V175.9c0-25.8 15.4-49 39.2-59L301.4 6.5c11.9-5 25.3-5 37.3 0L600.8 116.9c23.7 10 39.2 33.2 39.2 59V496c0 8.8-7.2 16-16 16s-16-7.2-16-16V175.9c0-12.9-7.7-24.5-19.6-29.5L326.2 36zM96 224c0-17.7 14.3-32 32-32H512c17.7 0 32 14.3 32 32V496c0 8.8-7.2 16-16 16c-.1 0-.2 0-.2 0H112.2c-.1 0-.2 0-.2 0c-8.8 0-16-7.2-16-16V224zm32 256H512V416H128v64zM512 320H128v64H512V320zM128 288H512V224H128v64z" /></svg>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-center font-bold">
                                    สินค้า
                                </h2>
                            </div>
                        </div>
                    </Link>
                </button>

            </div>
        </div>

    )
}
