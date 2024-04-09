import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";
import { ChangeProfitPerc } from "../../api/ApiWrapper";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

export default function ChangeProfitModal({ custom, profit, id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [minutes, setMinutes] = useState(0)
    const [profitChange, setProfitChange] = useState(0)
    const OnChangeProfitEventTriggerd = (newValue) => {
        setProfitChange(newValue);
    };

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
                                    <Slider step={0.01} min={-10} max={10} value={profitChange} handleStyle={{
                                        borderColor: "white",
                                        height: 20,
                                        width: 20,

                                        backgroundColor: "white"
                                    }}
                                        trackStyle={{ backgroundColor: "#059bbb #0B1217", height: 15 }}
                                        railStyle={{ backgroundColor: "#0B1217", height: 15 }}
                                        onChange={OnChangeProfitEventTriggerd} />
                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-medium">-10</span>
                                        <span className="text-white font-medium">+10</span>

                                    </div>
                                </div>

                            </div>
         
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => { ChangeProfitPerc(profitChange, id), setIsOpen(false) }} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
