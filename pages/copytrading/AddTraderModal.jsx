import { useState,useEffect } from "react";
import { AddTrader, listAllTraders } from "../../api/ApiWrapper";
import { setTraders } from "../../src/features/traders/traderSlice";
import {useDispatch} from 'react-redux'
import { ListAvailableStrategies } from "../../api/ApiWrapper";
import { statsCopy } from "../../api/ApiWrapper";
import { setStats } from "../../src/features/mainStats/statsSlice";
export default function AddTraderModal() {
  const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [file, setFile] = useState(null);
    const [strategiess, setStrategies] = useState([]);
    const [strategiesList, setStrategiesList] = useState([]);
    const [disabled,setDisabled] = useState(true)
    const handleMoveToAvailable = (strategy) => {
        setStrategies(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategiesList(prevState => [...prevState, strategy]);


    };
    const handleMoveToTrader = (strategy) => {
        setStrategiesList(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategies(prevState => [...prevState, strategy]);

    };


    useEffect(() => {
        ListAvailableStrategies(setStrategiesList)
    }, []);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddTrader = async (username, about, file,strategiesList) => {
        await AddTrader(username, about, file,strategiesList);
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
                                    <label className='text-white text-sm'>About</label>
                                    <textarea style={{ resize: 'none' }} onChange={(event) => setAbout(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[80px]' type='password' required ></textarea>
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
                                        {strategiess && strategiess.map((strategy) => (
                                            <div
                                                className={`text-white h-[50px] p-5 border-b border-white rounded-lg flex items-center font-medium bg-[#0B1217]`}
                                                key={strategy.id}
                                                onClick={() => handleMoveToAvailable(strategy)}
                                            >
                                                {strategy.name}
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
                                    <button disabled={disabled} onClick={()=> handleAddTrader(username, about, file,strategiess)} className='w-[600px] disabled:opacity-25 gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Add</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
