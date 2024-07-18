import { useState, useEffect } from "react";
import { AddNewStrategy } from "../../api/ApiWrapper";
import Image from "next/image";
import { listAllStrategies,ListAvailableStrategies } from "../../api/ApiWrapper";
import { setStrategies } from "../../src/features/strategies/strategySlice";
import { setAvailStrategies } from "../../src/features/strategies/availstrategySlice";
import { listCrypto } from "../../api/ApiWrapper";
import {useDispatch} from 'react-redux'
import { statsCopy } from "../../api/ApiWrapper";
import { setStats } from "../../src/features/mainStats/statsSlice";
export default function AddStrategyModal() {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [minDepo, setminDepo] = useState('');
    const [maxDepo, setmaxDepo] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [cryptoList, setCryptoList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedList, setSelectedList] = useState([]);
    const [maxCopiers, setmaxCopiers] = useState('');

    const [depositAmounts, setDepositAmounts] = useState([]);
    console.log(selectedList)
    const filteredCryptoList = cryptoList.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );
    async function handleAddClick(name, about, maxDepo, minDepo, depositAmounts,){
        await AddNewStrategy(name, about, maxDepo, minDepo, depositAmounts)
        await statsCopy(dispatch, setStats);
        await ListAvailableStrategies(dispatch,setAvailStrategies);

        setIsOpen(false)
        
        await listAllStrategies(dispatch,setStrategies)

     }
    const handleItemClick = (item) => {
        setSelectedList(prevList => {
            if (prevList.includes(item)) {
                return prevList.filter(selectedItem => selectedItem !== item);
            } else {
                return [...prevList, item];
            }
        });
    };

    const handleDepositChange = (item, amount) => {
        setDepositAmounts(prevState => {
            const updatedList = prevState.filter(entry => entry.name !== item);
            return [...updatedList, { name: item, total_value: amount }];
        });
    };


    useEffect(() => {
        listCrypto(setCryptoList);
    }, []);

    return (
        <div>
            <button className='w-full gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-t-lg text-white' onClick={() => setIsOpen(true)}>ADD NEW STRATEGY</button>
            {isOpen && (
                <div className={`addstrat-modal-overlay`}>
                    <div className={`addstrat-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-5 p-6">
                            <span className=' text-white font-bold'>Add new strategy</span>
                            <div className='flex flex-col gap-4'>
                                <div className="flex gap-3">
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-1 items-start flex-col'>
                                            <input onChange={(event) => setName(event.target.value)} placeholder='Name' className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[150px] h-[40px]' required />
                                        </div>
                                        <div className="flex items-center gap-1 bg-[#0B1217] p-[1px] rounded-lg">
                                        <input type='number' onChange={(event) => setminDepo(event.target.value)} placeholder='0' className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[50px] h-[40px]' required />
                                        <span className="text-[#9CA3AF] font-medium">/</span>
                                        <input type='number' onChange={(event) => setmaxDepo(event.target.value)} placeholder='100' className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[70px] h-[40px]' required />
                                        <span className="text-[#9CA3AF] font-medium">$</span>
                                        </div>
                     
                
                                        <div className='flex gap-1 items-start flex-col'>
                                            <textarea style={{ resize: 'none' }} onChange={(event) => setAbout(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[150px] h-[80px]' placeholder = 'About' type='password' required ></textarea>
                                        </div>
                                        <div className="flex flex-col  items-start">
                                            <input
                                                type="text"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                placeholder="Search"
                                                className=" px-2 w-[150px]  rounded-t-lg text-white h-10 outline-none bg-[#0B1217]"
                                            />
                                            <div className="h-[180px] w-[150px] bg-[#0B1217] rounded-b-lg overflow-y-auto">
                                                {filteredCryptoList.map((item, index) => (
                                                    <div key={index} onClick={() => handleItemClick(item)} className={`flex ${selectedList.includes(item) ? 'bg-[#243a49]' : ''} items-center h-[40px] px-5 gap-1 border-b border-[#5b5f66]`}>
                                                        <Image width={16} height={16} src={`/assets/icons/${item.toLowerCase()}.png`} />
                                                        <span className="text-white font-medium text-xs">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col w-[160px]  items-start ">
                                            <label className='text-[#9CA3AF] bg-[#0B1217] w-[160px]  rounded-t-lg p-1 font-medium text-sm'>Selected cryptos</label>
                                            <div className="h-[400px] w-[160px] bg-[#0B1217] rounded-b-lg overflow-y-auto">
                                                {selectedList.map((item, index) => (
                                                    <div key={index} className="flex items-center h-[50px] px-5 justify-between border-b border-[#5b5f66]">
                                                        <div className="flex items-center gap-1">
                                                            <Image width={16} height={16} src={`/assets/icons/${item.toLowerCase()}.png`} />
                                                            <span className="text-white font-bold text-xs">{item}</span>
                                                        </div>
                                                        <div className="flex items-center px-[1px] rounded-lg bg-[#142028]">
                                                        <input
                                                            type="number"
                                                            className="w-[40px] px-2 text-[#9CA3AF] rounded-lg bg-[#142028] font-medium text-sm  outline-none"
                                                            onChange={(e) => handleDepositChange(item, e.target.value)}
                                                        />
                                                        <span className="text-[#9CA3AF] text-sm font-medium ">
                                                            %
                                                        </span>
                                                        </div>
                                 
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between'>
                                    <button onClick={() => setIsOpen(false)} className='text-white text-sm font-bold'>Close</button>
                                    <button onClick={() =>  handleAddClick(name, about, maxDepo, minDepo, depositAmounts)} className='w-[160px] gradient-button h-[30px]  font-bold bg-[#00A2BF] rounded-lg text-white'>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
