import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { UsersInfo, UsersTotalInfo } from '../../api/ApiWrapper';
import { getServerSideProps as checkAuth } from '../../api/authCheck';
import UserModal from './UserModal';
export const getServerSideProps = async (context) => {
    return checkAuth(context);
};

export default function Users() {
    const [infoTotal, setTotalInfo] = useState('');
    const [info, setInfo] = useState([]);
    const [searchText, setSearchText] = useState('');
    const filteredUsersList = info.filter(item =>
        item.username.toLowerCase().includes(searchText.toLowerCase())
    );
    useEffect(() => {
        UsersInfo(setInfo);
        UsersTotalInfo(setTotalInfo);
    }, []);

    return (
        <div className="bg-[#0B1217] flex flex-col items-center justify-center h-[100vh] w-full">
            <div className='bg-[#142028] w-[300px] h-[400px] rounded-lg flex flex-col'>
                <div className='flex justify-between items-center p-3'>
                    <span className='text-white font-medium'>Total users balance: </span>
                    <span className='text-white font-medium'>{infoTotal}</span>
                </div>
            </div>
            <div className='flex flex-col'>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search"
                    className="px-2 w-full  rounded-t-lg text-white h-10 outline-none border-b border-[#25323b]  bg-[#142028]"
                />
                <div className='bg-[#142028] w-[300px] h-[400px] rounded-b-lg flex flex-col'>
                    {filteredUsersList.map((item, index) => (
                        <UserModal key={index} username={item.username} email={item.email} balance={item.wallet} date={new Date(item.date_of_registration).toLocaleDateString()} />
                    ))}
                </div>
            </div>

        </div>
    );
}
