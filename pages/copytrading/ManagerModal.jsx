import { useState } from "react";
import '../globals.css';

export default function AddManagerModal({}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className='w-[300px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-t-lg text-white'
            >
                ADD NEW MANAGER
            </button>
            {isOpen && (
                <div className={`addmanager-modal-overlay`}>
                    <div className={`addmanager-modal-content`}>
                        <div className="flex items-center justify-between">
                            <h5 className="font-medium text-white p-5 text-xl">Add New Manager</h5>
                            <button onClick={() => setIsOpen(false)}>
                                <img className="h-5 w-5 mr-5" src="/assets/icons/close.svg" alt="" />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-5">
                            <div className="flex w-[90%] flex-col gap-1">
                                <span className="font-medium text-white text-sm">Name</span>
                                <input
                                    type="text"
                                    className="w-[90%] h-10 outline-none bg-[#0B1217] px-2 text-white font-medium rounded-lg"
                                />
                            </div>
                            <div className="flex w-[90%] flex-col gap-1">
                                <span className="font-medium text-white text-sm">E-Mail</span>
                                <input
                                    type="text"
                                    className="w-[90%] h-10 outline-none bg-[#0B1217] px-2 text-white font-medium rounded-lg"
                                />
                            </div>
                            <div className="flex w-[90%] flex-col gap-1">
                                <label htmlFor="file-input" className="cursor-pointer">
                                    <svg
                                        width="41"
                                        height="40"
                                        viewBox="0 0 41 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="1"
                                            y="0.5"
                                            width="39"
                                            height="39"
                                            rx="7.5"
                                            stroke="white"
                                            stroke-dasharray="5 5"
                                        />
                                        <path
                                            d="M17.5 30H23.5C28.5 30 30.5 28 30.5 23V17C30.5 12 28.5 10 23.5 10H17.5C12.5 10 10.5 12 10.5 17V23C10.5 28 12.5 30 17.5 30Z"
                                            stroke="white"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M17.5 18C18.6046 18 19.5 17.1046 19.5 16C19.5 14.8954 18.6046 14 17.5 14C16.3954 14 15.5 14.8954 15.5 16C15.5 17.1046 16.3954 18 17.5 18Z"
                                            stroke="white"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M11.1719 26.9501L16.1019 23.6401C16.8919 23.1101 18.0319 23.1701 18.7419 23.7801L19.0719 24.0701C19.8519 24.7401 21.1119 24.7401 21.8919 24.0701L26.0519 20.5001C26.8319 19.8301 28.0919 19.8301 28.8719 20.5001L30.5019 21.9001"
                                            stroke="white"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => console.log(e.target.files[0])} // handle file selection here
                                />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className='w-[90%] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'
                            >
                                ADD
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
