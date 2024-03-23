import 'tailwindcss/tailwind.css';
import { signIn } from '../api/ApiWrapper';
import './globals.css'
import { useState } from 'react';
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const signInHandler = async () => {
        await signIn(username, password, setShowAlert);

        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <div className="bg-[#0B1217] flex flex-col items-center justify-center h-[100vh] w-full">
            <div className='bg-[#142028] p-5 w-[500px] h-[400px] flex flex-col gap-10 items-center justify-center rounded-xl shadow-lg'>
                <h5 className='text-white text-4xl font-bold'>Authorization</h5>
                <div className='flex gap-1 items-start flex-col'>
                    <label className='text-white text-sm' required>Username</label>
                    <input onChange={(event) => setUsername(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[280px] h-[40px]' required />
                </div>
                <div className='flex gap-1 items-start flex-col'>
                    <label className='text-white text-sm'>Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[280px] h-[40px]' type='password' required />
                </div>
                <button onClick={signInHandler} className='w-[280px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Sign In</button>
                {showAlert && (
                    <div className={`alerti ${showAlert ? 'slide-in' : 'slide-out'}`}>
                        <span className='text-white'>Invalid login or password</span>
                    </div>
                )}
            </div>
        </div>
    );
}
