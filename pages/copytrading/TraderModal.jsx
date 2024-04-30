import { useState, useEffect } from "react";
import { EditTrader, listAllTraders } from "../../api/ApiWrapper";
import { DelTrader } from "../../api/ApiWrapper";
import {useDispatch} from 'react-redux'
import { setTraders } from "../../src/features/traders/traderSlice";
import { ListAvailableStrategies } from "../../api/ApiWrapper";
import { statsCopy } from "../../api/ApiWrapper";
import { setStats } from "../../src/features/mainStats/statsSlice";
import Image from 'next/image';
export default function TraderModal({ visible,nickname, about, register, id, strategies, photo,  copierscount,maxcopiers,deposits }) {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false);
    const [strategiess, setStrategies] = useState(strategies)
    const [strategiesList, setStrategiesList] = useState(null)
    const [file, setFile] = useState('');
    const [copiers, setCopiersCount] = useState(copierscount)
    const [maxCopiers, setMaxCopiersCount] = useState(maxcopiers)
    const [deposit,setDeposit] = useState(deposits)
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
      useEffect(() => {
        setStrategies(strategies);
    }, [strategies]);

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

    const handleSubmit = async (username, abouts, id, file, strategiess,maxcopiers,isVisible,deposit) => {
        try {
            await EditTrader(username, abouts, id, file, strategiess,maxcopiers,isVisible,deposit);
            setIsOpen(false);
            await listAllTraders(dispatch, setTraders);
            await statsCopy(dispatch, setStats);

        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await DelTrader(id);
            setIsDelOpen(false);
            await listAllTraders(dispatch, setTraders);
            await statsCopy(dispatch, setStats);

        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };
       const handleMoveToAvailable = (strategy) => {
        setStrategies(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategiesList(prevState => [...prevState, strategy]);
    };
    const handleMoveToTrader = (strategy) => {
        console.log(strategy)
        setStrategiesList(prevState => prevState.filter((s) => s.id !== strategy.id));
        setStrategies(prevState => [...prevState, strategy]);
    };


    useEffect(() => {
        ListAvailableStrategies(setStrategiesList)
    }, []);
    const [username, setUsername] = useState(nickname);
    const [abouts, setAbouts] = useState(about)
    const [isVisible,setVisibility] = useState(visible)
    return (
        <div>
            <div onClick={() => setIsOpen(true)} key={id} className="text-white cursor-pointer divi flex flex-col p-5">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                    <img src={photo} className="w-[40px] h-[40px]" alt="" />
                    <span className="text-white text-xl font-bold">{nickname}</span>

                    </div>
                   
                    <span className="text-white text-xl font-bold">{copiers}/{maxCopiers} </span>
                </div>
            </div>

            {isOpen && (
                <div className={`edit-modal-overlay`}>
                    <div className={`edit-modal-content p-6`}>
                        <div className="flex items-center mb-10 justify-between">
                            <span className='text-2xl text-white font-bold'>Edit trader</span>
                     
                            <Image className="cursor-pointer" onClick={() => setIsDelOpen(true)} width={26} height={26} src="/assets/icons/delete.svg" alt="" />
                            {isDelOpen && (
                                <div className={`del-modal-overlay`}>
                                    <div className={`del-modal-content`}>
                                        <div className="flex flex-col w-full items-start gap-8 p-6">
                                            <div className='flex flex-col items-center gap-4'>
                                                <h5 className="text-white text-center font-medium text-2xl">Are you sure you want to delete trader {nickname}?</h5>

                                                <div className='flex w-full justify-between mt-4'>
                                                    <button onClick={() => setIsDelOpen(false)} className='text-white font-bold'>Close</button>
                                                    <button onClick={() => handleDelete(id)} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col w-full items-start gap-8">

                            <div className="flex gap-8">
                                <div className='flex flex-col gap-4'>

                                    {photo &&
                                        <div className='flex gap-1 items-start flex-col'>

                                            <label className='text-white text-sm' required>Avatar</label>
                                            <img
                                                className='w-[60px] h-[60px] rounded-xl'
                                                src={photo}
                                                alt=""
                                            />
                                        </div>
                                    }
                                    <div className="upload-container">
                                        <label className="upload-label" htmlFor="file-upload">
                                            Update avatar
                                        </label>
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".jpg, .jpeg, .png, .svg"
                                            onChange={handleFileChange}
                                            className="file-upload-input"
                                        />
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span className="text-white font-bold">Visibility</span>
                                        <div class="check">
                                    <input 
  id="check" 
  type="checkbox" 
  checked={isVisible} 
  onChange={() => setVisibility(!isVisible)}
/>
  <label for="check"></label>
</div>
                                    </div>
                                    
                                    <div className="flex rounded-2xl w-[160px] items-center bg-[#0B1217]">
                                    
                                            <div className='flex gap-1 items-start flex-col'>
                                                <input type='number' value={maxCopiers} onChange={(event) => setMaxCopiersCount(event.target.value)} className=' bg-[#0B1217] px-3 text-white text-xl font-medium rounded-lg shadow-lg outline-none w-[100px] h-[50px]' required />
                                            </div>
                                            <Image height={26} width={26} src='/assets/icons/user.svg' />
                                        </div>
                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm ' required>Username</label>
                                        <input onChange={(event) => setUsername(event.target.value)} value={username} className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                    </div>


                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm'>About</label>
                                        <textarea style={{ resize: 'none' }} onChange={(event) => setAbouts(event.target.value)} className='bg-[#0B1217] py-2 px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[90px]' type='password' required >{abouts}</textarea>
                                    </div>
         
                                    <div className='flex gap-1 items-start flex-col'>
                                        <label className='text-white text-sm ' required>Traders deposit</label>
                                        <input value={deposit} type="number" onChange={(event) => setDeposit(event.target.value)}  className='bg-[#0B1217] px-3 text-white text-sm rounded-lg shadow-lg outline-none w-[350px] h-[40px]' required />
                                    </div>


                                </div>
                                <div className="flex flex-col gap-6">
                                <div className="flex flex-col h-[200px] overflow-y-auto bg-[#0B1217] rounded-xl">
                                        <label className="text-white py-3 px-1 font-medium">Trader Strategies</label>
                                        {strategiess.map((strategy, index) => (
    <div className="flex  justify-between items-center border-b border-white p-5" key={strategy.id}>
        <div className="flex items-center gap-2">
        <button onClick={() => handleMoveToAvailable(strategy)}  className="bg-white hover:opacity-80 rounded-full h-[30px] w-[30px]">
                                                <img  className='h-full w-full' src="/assets/icons/chevron_down.svg" alt="" />

                                                </button>
                                                <span className="text-white font-medium">
   {strategy.name}

   </span>
        </div>

        <input
            type="number"
            className="h-[30px] w-[120px] rounded-xl outline-none text-white bg-[#142028] p-2"
            value={strategy.trader_deposit}
            onChange={(e) => handleInputChange(e.target.value, index)}
        />
    </div>
))}

                                    </div>
                                    <div className="flex flex-col h-[200px] w-[350px] overflow-y-auto bg-[#0B1217] rounded-xl">
                                        <label className="text-white py-3 px-1 font-medium">Available Strategies</label>

                                        {strategiesList && strategiesList.map((strategy) => (
                                            <div
                                                className={`text-white cursor-pointer h-[50px] p-5 border-b border-white  flex items-center font-medium `}
                                                key={strategy.id}
                                                onClick={() => handleMoveToTrader(strategy)}
                                            >
                                                {strategy.name}
                                            </div>
                                        ))}
                                    </div>

                                  
                                </div>
                            </div>
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                <button onClick={() => handleSubmit(username, abouts, id, file, strategiess,maxCopiers,isVisible,deposit)} className='w-[600px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
