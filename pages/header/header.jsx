import Link from "next/link"
import { signOut } from "../../api/ApiWrapper"
import { CheckPingHeader } from "../../api/ApiWrapper"
import { fetchIsAdmin } from "../../api/ApiWrapper";
import { MyInfo } from "../../api/ApiWrapper";
import { useState, useEffect } from "react"
import { useRouter } from 'next/router';

export default function Header() {

    const [urlyk, setUrlyk] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            const pathname = router.pathname;

            if (pathname.endsWith("/copytrading")) {
                setUrlyk('copy');
            } else if (pathname.endsWith("/users")) {
                setUrlyk('users');
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.pathname]);
    const [myInfo, setMyInfo] = useState({})
    const [isAdmin, setAdm] = useState(false);

    const [ping, setPing] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            await CheckPingHeader(setPing);
            await fetchIsAdmin(setAdm);
            await MyInfo(setMyInfo)
        };

        fetchData();
    }, []);
    return (
        <div style={{ zIndex: '1000' }} className='header  bg-[#142028] h-[60px] flex items-center justify-between px-10 shadow-lg '>
            <span className="text-white font-bold text-2xl">ADMINKA</span>
            <div className="flex items-center h-[70px] ">
                {ping &&
                    (!isAdmin &&
                        <button className="w-[200px] rounded-lg bg-[#5396a2] text-white h-[40px] font-medium " >USDT {myInfo.wallet}</button>

                    )
                }
                {ping &&
                    <Link href='/copytrading' className={`${urlyk === 'copy' ? 'font-bold bg-[#5396a2]' : 'font-medium'} rounded-xl text-white link w-[150px] `} >
                        COPY TRADING
                        </Link>

                }
                {ping &&

                    <Link href='/users' className={`${urlyk === 'users' ? 'font-bold bg-[#5396a2]' : 'font-medium'} rounded-xl text-white link w-[120px] `} >USERS</Link>
                }

                {ping &&

                    <button className="w-[100px] rounded-lg bg-[#00A2BF] text-white h-[40px] ml-5" onClick={signOut}>Log out</button>
                }
            </div>
        </div>
    )
}