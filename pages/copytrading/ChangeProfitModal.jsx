import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";
import { ChangeProfitPerc } from "../../api/ApiWrapper";
export default function ChangeProfitModal({ custom, profit, id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [minutes, setMinutes] = useState('')
    const [orofitChange, setProfitChange] = useState('')
    return (
        <div>
            <button className='w-full gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white' onClick={() => setIsOpen(true)}>Average profit: {profit}%</button>
            {isOpen && (
                <div className={`change-modal-overlay`}>
                    <div className={`change-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Modify strategy profit</span>
                            <div className="flex gap-[120px] items-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-3">
                                        <span className="text-white font-medium text-lg">Current profit: </span>
                                        <span className={`${(parseFloat(profit) > 0) ? 'text-[#23A25D]' : 'text-[#be3d3d]'} font-medium text-2xl`}>{profit}%</span>

                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span className="text-white font-medium text-lg">Custom profit: </span>
                                        <span className="text-white font-medium text-2xl">{custom}</span>

                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-white font-medium text-lg">Real profit: </span>
                                    <span className={`${((parseFloat(profit) - parseFloat(custom)).toFixed(2) > 0) ? 'text-[#23A25D]' : 'text-[#be3d3d]'} font-medium text-2xl`}>{(parseFloat(profit) - parseFloat(custom)).toFixed(2)}%</span>

                                </div>

                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-white font-medium ">Change profit in percentages</label>
                                <input type="number" onChange={(event) => setProfitChange(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white font-medium ">Timeframe for profit to change in minutes</label>
                                <input type="number" onChange={(event) => setMinutes(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' />
                            </div>
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => { ChangeProfitPerc(orofitChange, minutes, id), setIsOpen(false) }} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
