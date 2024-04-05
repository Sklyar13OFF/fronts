import { useState, useEffect } from "react";
import { DelStrategy } from "../../api/ApiWrapper";
import ChartComponent from "./StrategiesChart";
import Image from "next/image";
import { EditStrategy } from "../../api/ApiWrapper";
import '../globals.css'
import ChangeProfitModal from "./ChangeProfitModal";
import { listCrypto } from "../../api/ApiWrapper";
export default function StrategyModal({ depos, custom, current_copiers, name, minDepo, maxDepo, about, id, crypto, selected, maxCopiers, avg_profit, profits }) {
    const [isOpen, setIsOpen] = useState(false);
    const [minDepos, setminDepos] = useState(minDepo);
    const [maxDepos, setmaxDepos] = useState(maxDepo);
    const [naming, setNaming] = useState(name);
    const [isDelOpen, setIsDelOpen] = useState(false)
    const [cryptoList, setCryptoList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedList, setSelectedList] = useState(selected);
    const [depositAmounts, setDepositAmounts] = useState(crypto);
    const [abouts, setAbouts] = useState(about)
    const [copiers, setmaxCopiers] = useState(maxCopiers)
    const [copiersCount, setCopiersCount] = useState(current_copiers)
    const filteredCryptoList = cryptoList.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleItemClick = (item) => {
        setSelectedList(prevList => {
            if (prevList.includes(item)) {
                return prevList.filter(selectedItem => selectedItem !== item);
            } else {
                // Add item to selectedList
                return [...prevList, item];
            }
        });

        setDepositAmounts(prevState => {
            const exists = prevState.some(i => i.name === item);
            if (!exists) {
                // Add item to depositAmounts with default value
                return [...prevState, { name: item, total_value: 0, side: 'short' }];
            } else {
                // Update item in depositAmounts with side: 'short' instead of removing
                return prevState.map(i => {
                    if (i.name === item) {
                        return { ...i, side: 'short' };
                    }
                    return i;
                });
            }
        });
    };
    const handleDepositChange = (itemName, amount, side) => {
        setDepositAmounts(prevState => {
            return prevState.map(item => {
                if (item.name === itemName) {
                    const newSide = item.side === 'long' ? 'short' : 'long';
                    return { ...item, total_value: amount, side: newSide };
                }
                return item;
            });
        });
    };

    useEffect(() => {
        listCrypto(setCryptoList);
    }, []);

    return (
        <div>
            <div onClick={() => setIsOpen(true)} key={id} className="text-white divi flex flex-col p-5">
                <div className="flex flex-col gap-2  p-2">
                    <span className="text-white text-xl">{current_copiers}/{maxCopiers} </span>
                    <div className="flex item-center justify-center flex-col gap-3">
                        <ChartComponent chartData={profits} />

                        <p className="text-white text-center     text-xl">{name}</p>

                    </div>



                </div>

            </div>            {isOpen && (
                <div className={`editstrat-modal-overlay`}>
                    <div className={`editstrat-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">

                            <div className="flex items-start w-full gap-[240px]">
                                <div className="flex items-center ">
                                    <div className="flex flex-col gap-3">
                                        <h5 className='text-2xl text-white font-bold'>Edit strategy</h5>
                                        <div className="flex rounded-2xl w-[300px] items-center bg-[#0B1217]">
                                            <div className='flex gap-1 items-start flex-col'>
                                                <input type='number' value={copiersCount} onChange={(event) => setCopiersCount(event.target.value)} className='bg-[#0B1217] px-3 text-white font-medium text-xl rounded-lg shadow-lg outline-none w-[130px] text-right h-[50px]' required />
                                            </div>
                                            <div className="text-white font-bold">
                                                /
                                            </div>
                                            <div className='flex gap-1 items-start flex-col'>
                                                <input type='number' value={copiers} onChange={(event) => setmaxCopiers(event.target.value)} className=' bg-[#0B1217] px-3 text-white text-xl font-medium rounded-lg shadow-lg outline-none w-[130px] h-[50px]' required />
                                            </div>
                                            <Image height={26} width={26} src='/assets/icons/user.svg' />
                                        </div>
                                        <div className="flex rounded-2xl w-[300px] items-center bg-[#0B1217]">
                                            <div className='flex gap-1 items-start flex-col'>
                                                <input type='number' value={minDepos} onChange={(event) => setminDepos(event.target.value)} className='bg-[#0B1217] px-3 text-white font-medium text-xl rounded-lg shadow-lg outline-none w-[130px] text-right h-[50px]' required />
                                            </div>
                                            <div className="text-white font-bold">
                                                /
                                            </div>
                                            <div className='flex gap-1 items-start flex-col'>
                                                <input type='number' value={maxDepos} onChange={(event) => setmaxDepos(event.target.value)} className=' bg-[#0B1217] px-3 text-white text-xl font-medium rounded-lg shadow-lg outline-none w-[130px] h-[50px]' required />
                                            </div>
                                            <span className="text-white font-bold text-2xl">$</span>
                                        </div>
                                    </div>


                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <Image className="cursor-pointer" onClick={() => setIsDelOpen(true)} width={26} height={26} src="/assets/icons/delete.svg" alt="" />

                                    <div className='text-2xl text-white font-bold flex items-center gap-2'>

                                        <button className="text-green-500 bg-[#0B1217] w-[200px] rounded-lg px-3 py-2">{depos} $</button>
                                    </div>
                                    <ChangeProfitModal custom={custom} profit={avg_profit} id={id} />

                                </div>

                                {isDelOpen && (
                                    <div className={`del-modal-overlay`}>
                                        <div className={`del-modal-content`}>
                                            <div className="flex flex-col w-full items-start gap-8 p-6">
                                                <div className='flex flex-col items-center gap-4'>
                                                    <h5 className="text-white text-center font-medium text-2xl">Are you sure you want to delete strategy {name}?</h5>

                                                    <div className='flex w-full justify-between mt-4'>
                                                        <button onClick={() => setIsDelOpen(false)} className='text-white font-bold'>Close</button>
                                                        <button onClick={() => { DelStrategy(id), setIsOpen(false) }} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className="flex  gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-2 items-start flex-col rounded-lg bg-[#0B1217] p-3'>
                                            <label className='text-white font-medium text-sm' >Name</label>
                                            <input onChange={(event) => setNaming(event.target.value)} value={naming} className='bg-[#0B1217] border-t border-white text-white text-sm rounded-b-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-2 items-start flex-col rounded-lg bg-[#0B1217] p-3'>
                                            <label className='text-white font-medium text-sm' >About</label>
                                            <textarea style={{ resize: 'none' }} onChange={(event) => setAbouts(event.target.value)} className='bg-[#0B1217] border-t border-white py-2 px-3 text-white text-sm rounded-b-lg shadow-lg outline-none w-[350px] h-[80px]' type='password' required >{abouts}</textarea>
                                        </div>

                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col  items-start">
                                            <input
                                                type="text"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                placeholder="Search"
                                                className="px-2 w-[350px]  rounded-t-lg text-white h-10 outline-none bg-[#0B1217]"
                                            />
                                            <div className="h-[200px] w-[350px] bg-[#0B1217] rounded-b-lg overflow-y-auto">
                                                {filteredCryptoList.map((item, index) => (
                                                    <div key={index} onClick={() => handleItemClick(item)} className={`flex ${selectedList.includes(item) ? 'bg-[#243a49]' : ''} items-center h-[60px] px-5 gap-1 border-b border-white`}>
                                                        <Image width={26} height={26} src={`/assets/icons/${item.toLowerCase()}.png`} />
                                                        <span className="text-white font-medium text-sm">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="flex flex-col items-start bg-[#0B1217] rounded-lg px-3 py-1 gap-1">
                                    <label className='text-white text-sm font-bold'>Selected cryptos</label>
                                    <div className="h-[200px] w-full bg-[#0B1217] rounded-lg overflow-y-auto">
                                        {depositAmounts.map((item, index) => (
                                            <div key={index} className="flex items-center h-[60px] px-5 justify-between border-b border-white">
                                                <div className="flex items-center gap-1">
                                                    <Image width={26} height={26} src={`/assets/icons/${(item.name).toLowerCase()}.png`} />
                                                    <span className="text-white font-medium text-sm">{item.name}</span>
                                                </div>
                                                <label class="switch">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.side === 'long'}
                                                        onChange={(e) => handleDepositChange(item.name, item.total_value, e.target.checked ? 'long' : 'short')}
                                                    />
                                                </label>

                                                <input
                                                    type="number"
                                                    value={item.total_value}
                                                    className="w-[100px] px-2 text-white rounded-lg text-sm bg-[#142028] outline-none"
                                                    onChange={(e) => handleDepositChange(item.name, e.target.value,)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex w-full justify-between mt-8'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button onClick={() => EditStrategy(copiersCount, naming, abouts, maxDepos, minDepos, id, depositAmounts, copiers)} className='w-[470px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
