import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";
import { ChangeProfitPerc } from "../../api/ApiWrapper";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {useDispatch} from 'react-redux'
import { listAllStrategies } from "../../api/ApiWrapper";
import { setStrategies } from "../../src/features/strategies/strategySlice";
export default function ChangeProfitModal({ custom, profit, id }) {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [profitChange, setProfitChange] = useState(0)
    const OnChangeProfitEventTriggered = (event) => {
        const value = event.target.value;
        setProfitChange(value);
    };
    
    const handleEditClick = async (profitChange, id) => {
        try {
            await ChangeProfitPerc(profitChange, id)

            await listAllStrategies(dispatch,setStrategies);
            setIsOpen(false);
   

        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    }
    return (
        <div>
            <button className='w-[200px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white' onClick={() => setIsOpen(true)}>Profit: {profit}%</button>
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

                            <div className="flex flex-col w-full gap-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-white font-medium ">Change profit</label>
                                    <span className={`${profitChange < 0 ? 'text-red-500' : 'text-green-500'} font-bold text-xl `}>{profitChange} %</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <input type="number" className="bg-[#0B1217] text-white text-sm font-medium rounded-lg outline-none px-2 h-10" step={0.01} min={-1.5} max={1.5} value={profitChange} 
                       
                                        onChange={OnChangeProfitEventTriggered} />
                                   
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">-1.5</span>
                                        <span className="text-white font-medium">+1.5</span>

                                    </div>
                                </div>

                            </div>
         
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => handleEditClick(profitChange, id)} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
