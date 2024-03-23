import { useState, useEffect } from "react";
import { DelStrategy } from "../../api/ApiWrapper";
import Image from "next/image";
import { EditStrategy } from "../../api/ApiWrapper";
import { listCrypto } from "../../api/ApiWrapper";
export default function StrategyModal({ current_copiers, name, minDepo, maxDepo, about, id, crypto, selected, maxCopiers }) {
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

    const filteredCryptoList = cryptoList.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleItemClick = (item) => {
        setSelectedList(prevList => {
            if (prevList.includes(item)) {
                // Remove item from selectedList
                return prevList.filter(selectedItem => selectedItem !== item);
            } else {
                // Add item to selectedList
                return [...prevList, item];
            }
        });

        setDepositAmounts(prevState => {
            // Check if item already exists in depositAmounts
            const exists = prevState.some(i => i.name === item);
            if (!exists) {
                // Add item to depositAmounts with default value
                return [...prevState, { name: item, total_value: 0 }];
            } else {
                // Remove item from depositAmounts
                return prevState.filter(i => i.name !== item);
            }
        });
    };


    const handleDepositChange = (itemName, amount) => {
        setDepositAmounts(prevState => {
            return prevState.map(item => {
                if (item.name === itemName) {
                    // Update total_value for specific item
                    return { ...item, total_value: amount };
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
                <div className="flex justify-between">
                    <span className="text-white text-xl">{name}</span>
                    <span className="text-white text-xl">{current_copiers}/{maxCopiers}</span>


                </div>

            </div>            {isOpen && (
                <div className={`addstrat-modal-overlay`}>
                    <div className={`addstrat-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">

                            <div className="flex items-center gap-[460px]">
                                <span className='text-2xl text-white font-bold'>Edit strategy</span>
                                <Image className="cursor-pointer" onClick={() => setIsDelOpen(true)} width={26} height={26} src="/assets/icons/delete.svg" alt="" />
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
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Name</label>
                                            <input onChange={(event) => setNaming(event.target.value)} value={naming} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Minimum deposit amount</label>
                                            <input type='number' value={minDepos} onChange={(event) => setminDepos(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Maximum deposit amount</label>
                                            <input type='number' value={maxDepos} onChange={(event) => setmaxDepos(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Maximum copiers</label>
                                            <input type='number' value={copiers} onChange={(event) => setmaxCopiers(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm'>About</label>
                                            <textarea style={{ resize: 'none' }} onChange={(event) => setAbouts(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[80px]' type='password' required >{abouts}</textarea>
                                        </div>
                                        <div className="flex flex-col gap-1 items-start">
                                            <input
                                                type="text"
                                                value={searchText}
                                                onChange={(e) => setSearchText(e.target.value)}
                                                placeholder="Search"
                                                className="my-4 px-2 w-[350px]  rounded-lg text-white h-10 outline-none bg-[#0B1217]"
                                            />
                                            <div className="h-[200px] w-[350px] bg-[#0B1217] rounded-lg overflow-y-auto">
                                                {filteredCryptoList.map((item, index) => (
                                                    <div key={index} onClick={() => handleItemClick(item)} className={`flex ${selectedList.includes(item) ? 'bg-[#243a49]' : ''} items-center h-[60px] px-5 gap-1 border-b border-white`}>
                                                        <Image width={26} height={26} src={`/assets/icons/${item.toLowerCase()}.png`} />
                                                        <span className="text-white font-medium text-sm">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-col items-start gap-1">
                                            <label className='text-white text-sm'>Selected cryptos</label>
                                            <div className="h-[500px] w-[300px] bg-[#0B1217] rounded-lg overflow-y-auto">
                                                {depositAmounts.map((item, index) => (
                                                    <div key={index} className="flex items-center h-[60px] px-5 justify-between border-b border-white">
                                                        <div className="flex gap-1">
                                                            <Image width={26} height={26} src={`/assets/icons/${(item.name).toLowerCase()}.png`} />
                                                            <span className="text-white font-medium text-sm">{item.name}</span>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={item.total_value}
                                                            className="w-[100px] px-2 text-white rounded-lg text-sm bg-[#142028] outline-none"
                                                            onChange={(e) => handleDepositChange(item.name, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between mt-4'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button onClick={() => { EditStrategy(name, about, maxDepo, minDepo, id, depositAmounts), setIsOpen(false) }} className='w-[470px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
