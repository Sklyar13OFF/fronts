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
import Slider from "rc-slider";

import { listCrypto } from "../../api/ApiWrapper";
import { statsCopy } from "../../api/ApiWrapper";
import { setStats } from "../../src/features/mainStats/statsSlice";
export default function StrategyModal({ depos, custom, current_copiers, name, minDepo, maxDepo, about, id, crypto, selected, maxCopiers, avg_profit, profits,deposits,pool }) {
    const [deposit,setDeposit] = useState(deposits)
    const dispatch = useDispatch();
    const [txs,setTxs] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [minDepos, setminDepos] = useState(minDepo);
    const [maxDepos, setmaxDepos] = useState(maxDepo);
    const [inputClass, setInputClass] = useState('');
    const [newCrypto,setNewCrypto] = useState([])
    const [naming, setNaming] = useState(name);
    const [isDelOpen, setIsDelOpen] = useState(false)
    const [cryptoList, setCryptoList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedList, setSelectedList] = useState(selected);
    const [depositAmounts, setDepositAmounts] = useState(
       [
        {name: 'USDT', total_value: '100', side: 'short', init_value: '100', init_side: null}

       ]
    );
    const [leftform, setleftform] = useState(
        crypto ? crypto.map(item => ({ ...item, total_value: 100, init_value: item.total_value, init_side: item.side })) : []
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
            console.log(combinedArray)
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
        const handlefirstClick = async (id, changeCrypto, copiersCount, naming, abouts, maxDepos, minDepos, depositAmounts,leftform, copiers) => {
            try {
        
                
                    await EditStrategy(copiersCount, naming, abouts, maxDepos, minDepos, id, depositAmounts,leftform, copiers);
                    await statsCopy(dispatch, setStats);
                    window.location.reload()
            } catch (error) {
                console.error('Error occurred:', error);
            }
        };
        
        
        
        
        const [childModal, setChildModal] = useState(false); 
        
        useEffect(() => {
        }, [changeCrypto]);
        

     
        const handleItemClick = (item, amount, side = "short") => { // Set default value for side
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
        
            setDepositAmounts(prevState => {
                if (isItemInDepositAmounts) {
                    return prevState.map(i => {
                        if (i.name === item) {
                            return { ...i, total_value: amount, side: side };
                        }
                        return i;
                    });
                } else {
                    // Use the side variable directly as it now defaults to "short" if not provided
                    return [...prevState, { name: item, total_value: amount, side: side }];
                }
            });
            setChangeCrypto(prevChangeCrypto => {
                const newChangeCrypto = depositAmounts.reduce((acc, item) => {
                    const { init_value: initialDepositAmount, init_side: initialSide } = item;
                    // Check if the current amount is lower than the initial deposit amount and if the side remains the same
                    if (parseFloat(item.total_value) < parseFloat(initialDepositAmount) && initialSide === 'long') {
                        // Add the item to changeCrypto if the current amount is lower and the side remains the same
                        if (!acc.includes(item.name)) {
                            return [...acc, item.name];
                        }
                    }
                    return acc;
                }, []);
            
                console.log(newChangeCrypto); // Log the updated state here
            
                return newChangeCrypto;
            });
       
        };
        const handleInputChange = (itemName, amount) => {
            setDepositAmounts(prevState => {
                const updatedDepositAmounts = prevState.map(item => {
                    if (item.name === itemName) {
                        return { ...item, total_value: amount !== '' ? parseFloat(amount) : 0 };
                    }
                    return item;
                });
        
                const usdtToken = updatedDepositAmounts.find(item => item.name === 'USDT');
        
                const sumOfOtherTokens = updatedDepositAmounts
                    .filter(item => item.name !== 'USDT')
                    .reduce((sum, item) => sum + parseFloat(item.total_value), 0);
        
                const usdtValue = Math.max(100 - sumOfOtherTokens, 0);
        
                const updatedUsdtToken = { ...usdtToken, total_value: usdtValue };
        
                if (sumOfOtherTokens > 100) {
                    setInputClass('border border-red-500'); 
                } else {
                    setInputClass(''); 
                }
        
                return updatedDepositAmounts.map(item =>
                    item.name === 'USDT' ? updatedUsdtToken : item
                );
            });
        };
        
    
        
        const handleInputleftChange = (itemName, amount) => {
            setleftform(prevState => {
                const updatedleftForm = prevState.map(item => {
                    if (item.name === itemName) {
                        return { ...item, total_value: amount };
                    }
                    return item;
                });
                console.log(leftform)
                return updatedleftForm;
            });
        };
        const handleCheckboxChange = (itemName, side) => {
            setDepositAmounts(prevState => {
                const updatedDepositAmounts = prevState.map(item => {
                    if (item.name === itemName) {
                        return { ...item, side: side };
                    }
                    return item;
                });
                console.log(updatedDepositAmounts,'updated dolbayob')
                updateChangeCrypto(updatedDepositAmounts);
                setDepositAmounts(updatedDepositAmounts)
                return updatedDepositAmounts;
            });
        };
        
        useEffect(() => {
            updateChangeCrypto(depositAmounts);
        }, [depositAmounts]);
        
        const updateChangeCrypto = (updatedDepositAmounts) => {
            const newChangeCrypto = updatedDepositAmounts.reduce((acc, item) => {
                const { init_value: initialDepositAmount, init_side: initialSide, side: currentSide } = item;
                if (parseFloat(item.total_value) < parseFloat(initialDepositAmount) && initialSide === 'long') {
                    if (!acc.includes(item.name) && currentSide === initialSide) {
                        return [...acc, { name: item.name, side: item.side }]; // Include side in the result
                    }
                }
                return acc;
            }, []);
            console.log(newChangeCrypto);
            setChangeCrypto(newChangeCrypto);
        };
        
        
    
    useEffect(() => {
        listCrypto(setCryptoList);
    }, []);

    return (
        <div>
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
                                        <div className="w-[200px] h-[50px] flex flex-col items-center justify-center rounded-xl bg-[#0B1217]">
                                            <span className="text-white text-lg font-bold">Deposit: {deposit} $</span>
                                        </div>
                                        <div className="w-[300px] h-[50px] flex flex-col items-left p-5 justify-center rounded-xl bg-[#0B1217]">
                                            <span className="text-white text-lg font-bold">Available pool: {pool} $</span>
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
                                        <div className='flex gap-2 items-start flex-col w-[300px] rounded-lg bg-[#0B1217] p-3'>
                                            <label className='text-white font-medium text-sm' >Total Copiers</label>
                                            <input onChange={(event) => setCopiersCount(event.target.value)} value={copiersCount} className='bg-[#0B1217] border-t border-white text-white text-sm rounded-b-lg shadow-lg outline-none w-[250px] h-[40px]' required />
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
                                <div className="flex  gap-5">
                                    <div className="flex flex-col gap-4">
                                        <div className='flex gap-2 items-start flex-col w-[345px] rounded-lg bg-[#0B1217] p-3'>
                                            <label className='text-white font-medium text-sm' >Name</label>
                                            <input onChange={(event) => setNaming(event.target.value)} value={naming} className='bg-[#0B1217] border-t border-white text-white text-sm rounded-b-lg shadow-lg outline-none w-[320px] h-[40px]' required />
                                        </div>
                            
                                        <div className='flex gap-2 items-start flex-col w-[345px] rounded-lg bg-[#0B1217] p-3'>
                                            <label className='text-white font-medium text-sm' >About</label>
                                            <textarea style={{ resize: 'none' }} onChange={(event) => setAbouts(event.target.value)} className='bg-[#0B1217] border-t border-white py-2 px-3 text-white text-sm rounded-b-lg shadow-lg outline-none w-[320px] h-[80px]' type='password' required >{abouts}</textarea>
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
       

                <div className="flex gap-5 w-full items-center">
                <div className="flex flex-col items-start bg-[#0B1217] w-1/2 rounded-lg px-3 py-1 gap-1">
                                    <label className='text-white text-sm font-bold'>Close cryptos</label>
                                    <div className="h-[200px] w-full bg-[#0B1217] rounded-lg overflow-y-auto">
                                    {leftform.filter(item => item.name !== 'USDT').map((item, index) => (
                                        <div key={index} className="flex border-b border-white h-[100px] p-2 flex-col gap-2">
    <div  className="flex items-center px-5 justify-between ">
        <div className="flex items-center gap-1">
            <Image width={26} height={26} src={`/assets/icons/${item.name.toLowerCase()}.png`} />
            <span className="text-white font-medium text-sm">{item.name}</span>
        </div>
        <button className={`h-4 w-4 rounded-full ${item.side=='long'?'bg-[#1DA77D]':'bg-[#E81B1B]'}`}></button>
   
<span className="font-bold text-white text-sm">{item.init_value}%</span>
    </div>
 <div className="flex flex-col gap-3 items-center">
 <Slider
  step={1}
  min={0}
  max={100}
  value={item.total_value}
  handleStyle={{
    borderColor: "white",
    height: 20,
    width: 20,
    backgroundColor: "white"
  }}
  trackStyle={{ backgroundColor: "#059bbb #0B1217", height: 15 }}
  railStyle={{ backgroundColor: "#0B1217", height: 15 }}
  onChange={(value) => handleInputleftChange(item.name, value)}
/>
<span className="text-white font-bold">
                                     {item.total_value}%
                                        </span>  
 </div>

                                        </div>

))}
                                    </div>
                                </div>

                                <div className="flex flex-col w-1/2 items-start bg-[#0B1217] rounded-lg px-3 py-1 gap-1">
                                    <label className='text-white text-sm font-bold'>Selected cryptos</label>
                                    <div className="h-[200px] w-full bg-[#0B1217] rounded-lg overflow-y-auto">
                                    {depositAmounts.map((item, index) => (
    <div key={index} className="flex items-center h-[60px] px-5 justify-between border-b border-white">
        <div className="flex items-center gap-1">
            <Image width={26} height={26} src={`/assets/icons/${(item.name).toLowerCase()}.png`} />
            <span className="text-white font-medium text-sm">{item.name}</span>
        </div>
        {item.name !== 'USDT' &&
            <label className="switch">
                <input
                    type="checkbox"
                                        
                    checked={item.side === 'long'}
                    onChange={(e) => handleCheckboxChange(item.name, e.target.checked ? 'long' : 'short')}
                />
            </label>
        }
 <input
            type="number"
            readOnly={item.name === 'USDT' ? true : false}
            value={item.total_value}
            max={item.total_value}
            className={`w-[100px] px-2 text-white rounded-lg text-sm bg-[#142028] outline-none ${inputClass}`}
            onChange={(e) => handleInputChange(item.name, e.target.value)}
        />
    </div>
))}
                                    </div>
                                </div>               
                </div>
                           





                                <div className='flex w-full justify-between mt-8'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button onClick={() => handlefirstClick(id,changeCrypto,copiersCount, naming, abouts, maxDepos, minDepos, depositAmounts, leftform,copiers)} className='w-[470px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
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
