import React, { useState,useEffect } from "react";
import {  EditStrategy } from "../../api/ApiWrapper";

export default function NewProfitModal({copiers,name, about, maxDepo, mindepo,id, depos, copierss, isOpen, tx, onCloseModal, array }) {

    const createZeroArray = (data) => {
        const zeroArray = {};
        data.forEach(item => {
            const key = `${item.crypto_pair}-${item.id}`;
            zeroArray[key] = 0;
        });
        return zeroArray;
    };
    
    
    const [inputValues, setInputValues] = useState(createZeroArray(tx));
    const [isButtonEnabled,setEnabled] = useState(false)
    const [diff,setDiff] = useState(createZeroArray(array))
    const [sumi,setSum] = useState(1)

    const [final,setFinal] = useState([])
    const [initial,setInitial] = useState(array)
    const handleCloseModal = () => {
        onCloseModal(); 
    };

    function aggregateAndFilterCryptos(inputObject) {
        const aggregatedCryptos = {};
    
        Object.entries(inputObject).forEach(([key, value]) => {
            const [cryptoName] = key.split('USDT-');
            if (aggregatedCryptos.hasOwnProperty(cryptoName)) {
                aggregatedCryptos[cryptoName] += Number(parseFloat(value).toFixed(2));
            } else {
                aggregatedCryptos[cryptoName] = Number(parseFloat(value).toFixed(2));
            }
        });
    
        return Object.fromEntries(Object.entries(aggregatedCryptos).filter(([name, value]) => value > 0));
    }
    function subtractValues(object, array) {
        const allZeros = array.every(item => item.number === 0);
        if (allZeros) {
            return array.map(() => 0); 
        } else {
            return array.map(item => object[item.name] - item.number);
        }
    }
    function isAllZeros(array) {
        return array.every(value => value === 0);
    }
    function constructArrayFromObject(inputValues) {
        return Object.keys(inputValues).map((key) => {
          const [pair, transactionId] = key.split('-');
          return {
            transaction_id: Number(parseFloat(transactionId).toFixed(2)),
            value_change: Number(parseFloat(inputValues[key]).toFixed(2))
          };
        });
      }
useEffect(() => {
    let sum = 0;
    for (const key in inputValues) {
        sum += Number(parseFloat(inputValues[key]).toFixed(2));
    }

    const ts = aggregateAndFilterCryptos(inputValues);
    setDiff(ts);
    console.log(final)
    const updatedFinal = constructArrayFromObject(inputValues);
    console.log(inputValues)
    console.log(updatedFinal)
    console.log(tx,'array')
    setFinal(updatedFinal);
}, [inputValues]);

useEffect(() => {
    setEnabled(isAllZeros(subtractValues(diff, initial)));
}, [diff, initial]);

    const handleInputChange = (cryptoPair, index, value) => {
        setInputValues(prevState => ({
            ...prevState,
            [`${cryptoPair}-${index}`]: value
        }));
    };
    
    
    
    
    return (
        <div>
            {isOpen && (
                <div className={`child-modal-overlay`}>
                    <div className={`child-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <h5 className="text-white font-bold text-lg">Split up between txs</h5>
                            {/* Render array elements */}
                            {initial.map((crypto, index) => (
    <div key={index}>
        <p className='text-white font-medium'>
            {crypto.name}: {(crypto.number - (diff[crypto.name] || 0)).toFixed(2)}
        </p>
    </div>
))}



                            
                      
                           <div className='max-h-[200px] h-[200px] overflow-y-auto w-full'>
                           <table className='w-full'>
                                <thead>
                                    <tr className='h-10'>
                                        <th className='text-white font-medium'>Pair</th>
                                        <th className='text-white font-medium'>Value</th>
                                        <th className='text-white font-medium'>Side</th>
                                        <th className='text-white font-medium'>Open Price</th>
                                        <th className='text-white font-medium'>Open Time</th>
                                        <th className='text-white font-medium'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tx.map((item, index) => (
    <tr key={index} className='h-8'>
        <td className='text-center text-white font-medium'>{item.crypto_pair}</td>
        <td className='text-center text-white font-medium'>{item.total_value}%</td>
        <td className='text-center text-white font-medium'>{item.side}</td>
        <td className='text-center text-white font-medium'>{item.open_price}</td>
        <td className='text-center text-white font-medium'>{new Date(item.open_time).toDateString()}</td>
        <td className='text-center text-white font-medium'>
            {/* Log the value to debug */}
            {console.log('Max Value:', Number(parseInt(item.total_value)))}
            <input
    type="number"
    step="0.01"
    className={`rounded-lg bg-[#0B1217] outline-none w-[100px] ${inputValues[`${item.crypto_pair}-${item.id}`] > parseFloat(item.total_value) ? "border border-red-500" : ''} `}
    min='0'
    max='10'
    value={inputValues[`${item.crypto_pair}-${item.id}`]} 
    onChange={(e) => handleInputChange(item.crypto_pair, item.id, e.target.value)}
/>


        </td>
    </tr>
))}

                                </tbody>
                            </table>
                           </div>
                        
                            <div className='flex w-full justify-between mt-4'>
                                <button onClick={() => handleCloseModal()} className='text-white font-bold'>Close</button>
                                <button disabled={!isButtonEnabled} onClick={() => { EditStrategy(copiers,name, about, maxDepo, mindepo,id, depos, copierss,final), handleCloseModal() }} className='w-[440px] disabled:opacity-25 gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );}