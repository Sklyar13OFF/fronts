import { useState, useEffect } from "react";
import { AddNewStrategy } from "../../api/ApiWrapper";
import Image from "next/image";
import { listCrypto } from "../../api/ApiWrapper";

export default function AddStrategyModal() {
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
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Add new strategy</span>
                            <div className='flex flex-col gap-4'>
                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Name</label>
                                            <input onChange={(event) => setName(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Minimum deposit amount</label>
                                            <input type='number' onChange={(event) => setminDepo(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Maximum deposit amount</label>
                                            <input type='number' onChange={(event) => setmaxDepo(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm' >Maximum copiers</label>
                                            <input type='number' onChange={(event) => setmaxCopiers(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                        </div>
                                        <div className='flex gap-1 items-start flex-col'>
                                            <label className='text-white text-sm'>About</label>
                                            <textarea style={{ resize: 'none' }} onChange={(event) => setAbout(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[80px]' type='password' required ></textarea>
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
                                                {selectedList.map((item, index) => (
                                                    <div key={index} className="flex items-center h-[60px] px-5 justify-between border-b border-white">
                                                        <div className="flex gap-1">
                                                            <Image width={26} height={26} src={`/assets/icons/${item.toLowerCase()}.png`} />
                                                            <span className="text-white font-medium text-sm">{item}</span>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            className="w-[100px] px-2 text-white rounded-lg text-sm bg-[#142028] outline-none"
                                                            onChange={(e) => handleDepositChange(item, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between mt-4'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button onClick={() => { AddNewStrategy(name, about, maxDepo, minDepo, depositAmounts,), setIsOpen(false) }} className='w-[470px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
