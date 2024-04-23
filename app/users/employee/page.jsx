import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-yellow-400">
            <div className='flex justify-center flex-col items-center min-h-screen'>
                <div>Rest</div>
                <Link href={'/'}>Login</Link>
            </div>
        </div>
    );
}