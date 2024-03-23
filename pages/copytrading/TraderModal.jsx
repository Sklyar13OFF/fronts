import { useState, useEffect } from "react";
import { EditTrader } from "../../api/ApiWrapper";
import { DelTrader } from "../../api/ApiWrapper";
import { listAllStrategies } from "../../api/ApiWrapper";
import Image from 'next/image';
export default function TraderModal({ nickname, about, register, id, strategies, photo, folCount, avg_profit, copierscount }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    const [strategiess, setStrategies] = useState(strategies)
    const [strategiesList, setStrategiesList] = useState(null)
    const [file, setFile] = useState('');
    const [list, setList] = useState()
    const [followers, setFollowers] = useState(folCount)
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    useEffect(() => {
        listAllStrategies(setStrategiesList)
    }, []);
    const [username, setUsername] = useState(nickname);
    const [abouts, setAbouts] = useState(about)
    return (
        <div>
            <div onClick={() => setIsOpen(true)} key={id} className="text-white cursor-pointer divi flex flex-col p-5">
                <div className="flex justify-between">
                    <span className="text-white text-xl">{nickname}</span>
                    <span className="text-xl">{new Date(register).toLocaleDateString()}</span>
                </div>
            </div>
            {isOpen && (
                <div className={`edit-modal-overlay`}>
                    <div className={`edit-modal-content p-6`}>
                        <div className="flex items-center mb-10 justify-between">
                            <span className='text-2xl text-white font-bold'>Edit trader</span>
                            <Image className="cursor-pointer" onClick={() => setIsDelOpen(true)} width={26} height={26} src="/assets/icons/delete.svg" alt="" />
                            {isDelOpen && (
                                <div className={`del-modal-overlay`}>
                                    <div className={`del-modal-content`}>
                                        <div className="flex flex-col w-full items-start gap-8 p-6">
                                            <div className='flex flex-col items-center gap-4'>
                                                <h5 className="text-white text-center font-medium text-2xl">Are you sure you want to delete trader {nickname}?</h5>

                                                <div className='flex w-full justify-between mt-4'>
                                                    <button onClick={() => setIsDelOpen(false)} className='text-white font-bold'>Close</button>
                                                    <button onClick={() => { DelTrader(id), setIsOpen(false) }} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full items-start gap-8">

                            <div className="flex gap-8">
                                <div className='flex flex-col gap-4'>

                                    {photo &&
                                        <div className='flex gap-1 items-start flex-col'>

                                            <label className='text-white text-sm' required>Avatar</label>
                                            <Image
                                                className='rounded-xl'
                                                width={60}
                                                height={60}
                                                src={photo}
                                                alt=""
                                            />
                                        </div>
                                    }
                                    <div className="upload-container">
                                        <label className="upload-label" htmlFor="file-upload">
                                            Update avatar
                                        </label>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".jpg, .jpeg, .png, .svg"
                                            onChange={handleFileChange}
                                            className="file-upload-input"
                                        />
                                    </div>
                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm ' required>Username</label>
                                        <input onChange={(event) => setUsername(event.target.value)} value={username} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                    </div>
                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm' required>Followers count</label>
                                        <input type='number' onChange={(event) => setFollowers(event.target.value)} value={followers} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                    </div>

                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm'>About</label>
                                        <textarea style={{ resize: 'none' }} onChange={(event) => setAbouts(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[80px]' type='password' required >{abouts}</textarea>
                                    </div>




                                </div>
                                <div className="flex flex-col gap-4">
                                    {strategiesList.map((strategy) => (
                                        <div
                                            className={`text-white h-[50px] p-5 border-b border-white flex items-center font-medium ${strategiess && strategiess.some((s) => s.id === strategy.id) ? 'bg-red-500' : ''}`}
                                            key={strategy.id}
                                        >
                                            {strategy.name}
                                        </div>
                                    ))}
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Average profit</label>
                                        <span className="font-bold text-right text-white text-lg">{avg_profit}</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Copiers Count</label>
                                        <span className="font-bold text-right text-white text-lg">{copierscount}</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Profit-to-Loss Ratio</label>
                                        <span className="font-bold text-right text-white text-lg">4.63:1</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Sharpe Ratio</label>
                                        <span className="font-bold text-right text-white text-lg">0.46</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Sortino Ratio</label>
                                        <span className="font-bold text-right text-white text-lg">0.46</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Average holding time </label>
                                        <span className="font-bold text-right text-white text-lg">1.65 Days</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Weekly trades</label>
                                        <span className="font-bold text-right text-white text-lg">9.86</span>
                                    </div>
                                    <div className='flex justify-between items-center '>
                                        <label className='text-white w-[250px] text-lg font-bold ' required>Last Traded at</label>
                                        <span className="font-bold text-right text-white text-lg">2023-11-08 16:17:13</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => { EditTrader(username, abouts, id, file, followers, copierscount), setIsOpen(false) }} className='w-[600px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
