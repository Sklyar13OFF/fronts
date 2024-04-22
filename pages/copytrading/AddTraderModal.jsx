import { useState,useEffect } from "react";
import { AddTrader, listAllTraders } from "../../api/ApiWrapper";
import { setTraders } from "../../src/features/traders/traderSlice";
import {useDispatch} from 'react-redux'
import { ListAvailableStrategies } from "../../api/ApiWrapper";
import { statsCopy } from "../../api/ApiWrapper";
import { setStats } from "../../src/features/mainStats/statsSlice";
export default function AddTraderModal() {
  const dispatch = useDispatch();
    const [deposit,setDeposit] = useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [file, setFile] = useState(null);
    const [strategiess, setStrategies] = useState([]);
    const [strategiesList, setStrategiesList] = useState([]);
    const [disabled,setDisabled] = useState(true)
    const handleMoveToAvailable = (strategy) => {
        // Assuming you have a default deposit value for each strategy
        strategy.trader_deposit = "0"; // You can set it to any default value you prefer
        setStrategies(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategiesList(prevState => [...prevState, strategy]);
    };
    const handleInputChange = (value, index) => {
        setStrategies(prevStrategies => {
            const updatedStrategies = prevStrategies.map((strategy, i) => {
                if (i === index) {
                    // Update the trader_deposit value
                    const updatedStrategy = { ...strategy, trader_deposit: parseFloat(value) };
                    return updatedStrategy;
                }
                return strategy;
            });
    
            // Calculate the total_deposited value based on updated trader_deposit values
            const totalDeposited = updatedStrategies.reduce((total, strategy) => {
                return total + parseFloat(strategy.trader_deposit || 0);
            }, 0);
    
            // Update the total_deposited value in each strategy
            const strategiesWithTotalDeposited = updatedStrategies.map(strategy => ({
                ...strategy,
                total_deposited: totalDeposited.toFixed(2) // Assuming total_deposited is a string, round it to 2 decimal places
            }));
    
            console.log(strategiesWithTotalDeposited, 'updated strategies');
            return strategiesWithTotalDeposited;
        });
    };
    
    const handleMoveToTrader = (strategy) => {
        // Remove the trader_deposit field from the strategy before moving it
        const { trader_deposit, ...strategyWithoutDeposit } = strategy;
        setStrategiesList(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategies(prevState => [...prevState, strategyWithoutDeposit]);
    };
    

    useEffect(() => {
        ListAvailableStrategies(setStrategiesList)
    }, []);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddTrader = async (username, about, file,strategiesList,deposit) => {
        await AddTrader(username, about, file,strategiesList,deposit);
        await listAllTraders(dispatch,setTraders)
        setIsOpen(false);
        await statsCopy(dispatch, setStats);

    };
    useEffect(() => {
        if (username.trim() !== '' && about.trim() !== '' && strategiess.length > 0) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }, [username, about, strategiess]);
    return (
        <div>
            <button className='w-full gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-t-lg text-white' onClick={() => setIsOpen(true)}>ADD NEW TRADER</button>
            {isOpen && (
                <div className={`add-modal-overlay`}>
                    <div className={`add-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Add new trader</span>
                            <div className="flex gap-2">
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-1 items-start flex-col'>
                                    <label className='text-white text-sm' required>Username</label>
                                    <input onChange={(event) => setUsername(event.target.value)} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                </div>
                                <div className='flex gap-1 items-start flex-col'>
                                    <label className='text-white text-sm'>Traders deposit</label>
                                    <input style={{ resize: 'none' }} onChange={(event) => setDeposit(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                </div>
                                <div className='flex gap-1 items-start flex-col'>
                                    <label className='text-white text-sm'>About</label>
                                    <textarea style={{ resize: 'none' }} onChange={(event) => setAbout(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[80px]' required ></textarea>
                                </div>
                                <div className="upload-container">
                                    <label className="upload-label" htmlFor="file-upload">
                                        Upload avatar
                                    </label>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept=".jpg, .jpeg, .png, .svg"
                                        onChange={handleFileChange}
                                        className="file-upload-input"
                                    />
                                </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                <div className="flex flex-col h-[200px] overflow-y-auto bg-[#0B1217] rounded-xl">
                                        <label className="text-white py-3 px-1 font-medium">Trader Strategies</label>
                                        {strategiess && strategiess.map((strategy,index) => (
                                            <div key={index} className="flex justify-between px-5 border-b border-white">
                                            <div
                                                className={`text-white h-[50px] p-5  rounded-lg flex items-center font-medium bg-[#0B1217]`}
                                                key={strategy.id}
                                                onClick={() => handleMoveToAvailable(strategy)}
                                            >
                                                {strategy.name}
                                            </div>
                                            <input type="number" className="w-[120px] text-white p-2 h-[30px] bg-[#142028] rounded-xl outline-none" onChange={(e) => handleInputChange(e.target.value, index)} />
                                            </div>

                                        ))}
                                    </div>
                                    <div className="flex flex-col h-[200px] w-[350px] overflow-y-auto bg-[#0B1217] rounded-xl">
                                        <label className="text-white py-3 px-1 font-medium">Available Strategies</label>

                                        {strategiesList && strategiesList.map((strategy) => (
                                            <div
                                                className={`text-white h-[50px] p-5 border-b border-white rounded-lg flex items-center font-medium `}
                                                key={strategy.id}
                                                onClick={() => handleMoveToTrader(strategy)} // Move to trader list
                                            >
                                                {strategy.name}
                                            </div>
                                        ))}
                                    </div>

                                  
                                </div>
                            </div>
                    
                          
                                <div className='flex w-full justify-between mt-4'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button disabled={disabled} onClick={()=> handleAddTrader(username, about, file,strategiess,deposit)} className='w-[600px] disabled:opacity-25 gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Add</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
