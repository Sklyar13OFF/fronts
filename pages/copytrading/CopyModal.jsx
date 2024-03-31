import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";
import { ChangeProfitPerc } from "../../api/ApiWrapper";
import ChartComponent from "./StrategiesChart";
import DepositModal from "./DepositModal";
export default function CopyModal({ trader }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button className='w-[80px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white' onClick={() => setIsOpen(true)}>Copy
            </button>
            {isOpen && (
                <div className={`copy-modal-overlay`}>
                    <div className={`copy-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Select strategy to copy</span>
                            <div className="overflow-x-auto w-[800px]">
                                {trader.strategies.map((strategy) => (
                                    <div className="w-[400px] h-[300px] flex flex-col  rounded-xl shadow-2xl p-5 bg-[#142028]">
                                        <div className="flex flex-col justify-between items-start">
                                            <div className="flex gap-5 items-start">
                                                <div className="flex gap-[120px]">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-white font-bold text-lg">{strategy.name}</span>
                                                    </div>
                                                    <DepositModal id={strategy.id} />

                                                </div>

                                            </div>
                                            <ChartComponent className='my-3' chartData={strategy.profits} />
                                        </div>

                                        <div className="flex flex-col gap-2 my-2">
                                            <div className="flex justify-between">
                                                <span className="text-white font-medium">Profit</span>
                                                <span className="text-white font-bold">{strategy.avg_profit}</span>

                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white font-medium">Copiers</span>
                                                <span className="text-white font-bold">{strategy.total_copiers}/{strategy.max_users}</span>

                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>

                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='w-full gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>CLOSE</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
