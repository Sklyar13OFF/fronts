import { useState, useEffect } from "react";
import { DelStrategy } from "../../api/ApiWrapper";
import ChartComponent from "./StrategiesChart";
import Image from "next/image";
import { listAllStrategies } from "../../api/ApiWrapper";
import { setStrategies } from "../../src/features/strategies/strategySlice";
import {useDispatch} from 'react-redux'

import { EditStrategy } from "../../api/ApiWrapper";
import { setAvailStrategies } from "../../src/features/strategies/availstrategySlice";
import { ListAvailableStrategies } from "../../api/ApiWrapper";
import '../globals.css'
import ChangeProfitModal from "./ChangeProfitModal";
import { GetTxs } from "../../api/ApiWrapper";

import { listCrypto } from "../../api/ApiWrapper";
import { statsCopy } from "../../api/ApiWrapper";
import NewProfitModal from "./NewProfitModal";
import { setStats } from "../../src/features/mainStats/statsSlice";
export default function StrategyModal({ depos, custom, current_copiers, name, minDepo, maxDepo, about, id, crypto, selected, maxCopiers, avg_profit, profits }) {
   
    const dispatch = useDispatch();
    const [txs,setTxs] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [minDepos, setminDepos] = useState(minDepo);
    const [maxDepos, setmaxDepos] = useState(maxDepo);
    const [naming, setNaming] = useState(name);
    const [isDelOpen, setIsDelOpen] = useState(false)
    const [cryptoList, setCryptoList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedList, setSelectedList] = useState(selected);
    const [depositAmounts, setDepositAmounts] = useState(

       crypto ? crypto.map(item => ({ ...item, init_value: item.total_value, init_side: item.side })) : {}
    );
    

    const [abouts, setAbouts] = useState(about)
    const [copiers, setmaxCopiers] = useState(maxCopiers)
    const [combinedCryptoArray, setCombinedCryptoArray] = useState([]);

    const [copiersCount, setCopiersCount] = useState(current_copiers)
    const [changeCrypto,setChangeCrypto] = useState([])
    const filteredCryptoList = cryptoList.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );
    useEffect(() => {
        // Function to update the combinedCryptoArray
        const updateCombinedCryptoArray = () => {
            const combinedArray = [];
            // Iterate through changeCrypto array
            changeCrypto.forEach(crypto => {
                // Find the crypto in depositAmounts
                const depositCrypto = depositAmounts.find(item => item.name === crypto);
                if (depositCrypto) {
                    // If found, add it to the combined array with its number
                    combinedArray.push({ name: crypto, number:depositCrypto.init_value- depositCrypto.total_value });
                }
            });
            // Update the state with the new combined array
            setCombinedCryptoArray(combinedArray);
        };

        // Call the function to update the combinedCryptoArray initially
        updateCombinedCryptoArray();

    }, [changeCrypto, depositAmounts]);
    const handleDelClick = async (id) => {
        try {
            await DelStrategy(id);
                        setIsDelOpen(false);
            await listAllStrategies(dispatch,setStrategies);
            await statsCopy(dispatch, setStats);
            await ListAvailableStrategies(dispatch,setAvailStrategies);

        } catch (error) {
            // Handle errors here
            console.error('Error in handleSubmit:', error);
        }}
        const handlefirstClick = async (id, changeCrypto, copiersCount, naming, abouts, maxDepos, minDepos, depositAmounts, copiers) => {
            try {
                const res = await GetTxs(id, changeCrypto);
        
                if (!res) {
                    await EditStrategy(copiersCount, naming, abouts, maxDepos, minDepos, id, depositAmounts, copiers);
                    window.location.href=''
                    await statsCopy(dispatch, setStats);
                } else {
                    setTxs(res);
                    setChildModal(true);
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        
        
        
        
        const [childModal, setChildModal] = useState(false); 
        
        useEffect(() => {
        }, [changeCrypto]);
        
  
        const handleItemClick = (item, amount, side) => {
            setSelectedList(prevList => {
                if (prevList.includes(item)) {
                    const updatedList = prevList.filter(selectedItem => selectedItem !== item);
                    setDepositAmounts(prevDepositAmounts => {
                        return prevDepositAmounts.filter(depositItem => depositItem.name !== item);
                    });
                    return updatedList;
                } else {
                    return [...prevList, item];
                }
            });
        
            const isItemInDepositAmounts = depositAmounts.some(i => i.name === item);
        
            // Update depositAmounts with the new item
            setDepositAmounts(prevState => {
                if (isItemInDepositAmounts) {
                    // If the item is already in depositAmounts, update it
                    return prevState.map(i => {
                        if (i.name === item) {
                            return { ...i, total_value: amount, side: side };
                        }
                        return i;
                    });
                } else {
                    // Add the item to depositAmounts
                    return [...prevState, { name: item, total_value: amount, side: side }];
                }
            });
        
            // Update the changeCrypto array
            setChangeCrypto(prevChangeCrypto => {
                if (isItemInDepositAmounts) {
                    // Remove the item if it exists in changeCrypto
                    return prevChangeCrypto.filter(changeItem => changeItem !== item);
                } else {
                    // Add the item to changeCrypto
                    return [...prevChangeCrypto, item];
                }
            });
        };
        const handleDepositChange = (itemName, amount, side) => {
            // Find the initial deposit amount and side for the item
            const { init_value: initialDepositAmount, init_side: initialSide } = depositAmounts.find(item => item.name === itemName) || { init_value: 0, init_side: null };
        
            // Update depositAmounts with the new amount and side
            setDepositAmounts(prevState => {
                return prevState.map(item => {
                    if (item.name === itemName) {
                        return { ...item, total_value: amount, side: side };
                    }
                    return item;
                });
            });
        
            // Update the changeCrypto array
            setChangeCrypto(prevChangeCrypto => {
                // Check if the current amount is lower than the initial deposit amount and if the side remains the same
                if (parseFloat(amount) < parseFloat(initialDepositAmount) && side === initialSide) {
                    // Add the item to changeCrypto if the current amount is lower and the side remains the same
                    if (!prevChangeCrypto.includes(itemName)) {
                        return [...prevChangeCrypto, itemName];
                    }
                } else {
                    // Remove the item from changeCrypto if the current amount is not lower or the side changed
                    return prevChangeCrypto.filter(item => item !== itemName);
                }
                return prevChangeCrypto; // Return previous state if no changes are made
            });
        };
        
    const handleCloseModal = () => {
        setChildModal(false);
    };
    
    useEffect(() => {
        listCrypto(setCryptoList);
    }, []);

    return (
        <div>
{childModal && <NewProfitModal copiers={copiersCount} name={naming} about={abouts} maxDepo={maxDepos} mindepo={minDepos} id={id} depos={depositAmounts} copierss={copiers} isOpen={childModal} tx={txs} onCloseModal={handleCloseModal} array={combinedCryptoArray}/>}
            <div onClick={() => setIsOpen(true)} key={id} className="text-white divi flex flex-col p-5">
                <div className="flex flex-col gap-2  p-2">
                   
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
                                                        <button onClick={() => handleDelClick(id)} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Delete</button>
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
                                                {item.name != 'USDT' && 
                                                                      <label className="switch">
                                                   <input
    type="checkbox"
    checked={item.side === 'long'}
    onChange={(e) => handleDepositChange(item.name, item.total_value, e.target.checked ? 'long' : 'short')}
/>

                                                                  </label>
                                                }
                          

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
                                    <button onClick={() => handlefirstClick(id,changeCrypto,copiersCount, naming, abouts, maxDepos, minDepos, depositAmounts, copiers)} className='w-[470px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
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
