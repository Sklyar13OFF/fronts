import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";
import { CopyStrategy } from "../../api/ApiWrapper";
import ChartComponent from "./StrategiesChart";
export default function DepositModal({ id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('')
    return (
        <div>
            <button className='w-[80px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white' onClick={() => setIsOpen(true)}>Copy
            </button>
            {isOpen && (
                <div className={`depo-modal-overlay`}>
                    <div className={`depo-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <h5 className="text-white font-bold text-lg">Amount to deposit into strategy</h5>
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Sum to deposit in USDT</span>
                                <input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} className="border text-white p-2 border-white rounded-lg w-full bg-transparent h-[40px] outline-none" />

                            </div>
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => { CopyStrategy(id, amount), setIsOpen(false) }} className='w-[140px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
