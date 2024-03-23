import { useState } from "react";
import { AddTrader } from "../../api/ApiWrapper";

export default function AddTraderModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [about, setAbout] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddTrader = async () => {
        await AddTrader(username, about, file);
        setIsOpen(false);
    };

    return (
        <div>
            <button className='w-full gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-t-lg text-white' onClick={() => setIsOpen(true)}>ADD NEW TRADER</button>
            {isOpen && (
                <div className={`add-modal-overlay`}>
                    <div className={`add-modal-content`}>
                        <div className="flex flex-col w-full items-start gap-8 p-6">
                            <span className='text-2xl text-white font-bold'>Add new trader</span>
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
                                <div className='flex w-full justify-between mt-4'>
                                    <button onClick={() => setIsOpen(false)} className='text-white font-bold'>Close</button>
                                    <button onClick={handleAddTrader} className='w-[270px] gradient-button h-[40px] font-bold bg-[#00A2BF] rounded-lg text-white'>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
