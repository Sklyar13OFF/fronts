import Link from "next/link"
import { signOut } from "../../api/ApiWrapper"
import { CheckPingHeader } from "../../api/ApiWrapper"
import { useState, useEffect } from "react"
export default function Header() {
    const [ping, setPing] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            await CheckPingHeader(setPing);
        };

        fetchData();
    }, []);
    return (
        <div style={{ zIndex: '1000' }} className='header  bg-[#142028] h-[60px] flex items-center justify-between px-10 shadow-lg '>
            <span className="text-white font-bold text-2xl">ADMINKA</span>
            <div className="flex items-center h-[70px] ">
                {ping &&
                    <Link href='/copytrading' className="text-white link w-[200px] font-medium" >COPY TRADING</Link>

                }
                {ping &&

                    <Link href='/users' className="text-white link w-[200px]  font-medium" >USERS</Link>
                }
                {ping &&

                    <button className="w-[100px] rounded-lg bg-[#00A2BF] text-white h-[40px] " onClick={signOut}>Log out</button>
                }
            </div>
        </div>
    )
}