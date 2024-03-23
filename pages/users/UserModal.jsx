import { useState } from "react";

export default function UserModal({ username, email, date, balance }) {

    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <div onClick={() => setIsOpen(true)} className='flex justify-between items-center px-2 h-[50px]' key={username}>
                <span className='text-white font-medium'>{username}
                </span>

            </div>
            {isOpen && (
                <div className={`add-modal-overlay`}>
                    <div className={`add-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Info about {username}</span>
                            <div className='flex flex-col gap-4'>
                                <span className="text-white font-medium">Username: {username}</span>
                                <span className='text-white font-medium'>Email: {email}
                                </span>
                                <span className='text-white font-medium'>Registered at: {date}
                                </span>
                                <span className='text-white font-medium'>Balance in USDT: {balance}
                                </span>
                                <div className='flex w-full justify-between mt-4'>
                                    <button onClick={() => setIsOpen(false)} className='text-white rounded-lg font-bold gradient-button h-[40px] w-[340px] bg-[#00A2BF] '>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
