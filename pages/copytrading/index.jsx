import { useState, useEffect } from "react"
import TraderModal from "./TraderModal";
import 'tailwindcss/tailwind.css';
import { useSelector } from 'react-redux';
import StrategyModal from "./StrategyModal";
import '../globals.css'
import CopyModal from "./CopyModal";
import { fetchIsAdmin } from "../../api/ApiWrapper";
import AddTraderModal from "./AddTraderModal";
import AddStrategyModal from "./AddStrategyModal";
import { MyTraders } from "../../api/ApiWrapper";
import LineChart from "./LineChart";
import PieChart from './PieChart';
import { PieChartData } from "../../api/ApiWrapper";
import { getServerSideProps as checkAuth } from '../../api/authCheck';
export const getServerSideProps = async (context) => {
    return checkAuth(context);
};
export default function CopyTrading() {
    const [myInfo, setMyInfo] = useState({})
    const traders = useSelector((state) => state.traders.value);
    const strategies = useSelector((state) => state.strategies.value);
    const stats = useSelector((state) => state.stats.value);
    const [isAdmin, setAdm] = useState(false);
    useEffect(() => {
        fetchIsAdmin(setAdm);
        MyTraders(setMyInfo)
    }, []);






    return (
        <div>
            {isAdmin ? (
                < div className="flex flex-col w-full items-center h-[100vh] pt-[90px] bg-[#0B1217] justify-start" >
                    <div className=" gap-5 flex items-start justify-center">
                        <div className="flex flex-col gap-5">
                            <div className="flex bg-[#142028] rounded-lg p-4 flex-col  w-[400px] h-[200px]">
                                <div className="flex h-[30px] justify-between items-center">
                                    <span className="text-white font-bold">Traders Count</span>
                                    <span className="text-white">{stats.traders_count}</span>
                                </div>
                                <div className="flex h-[30px] justify-between items-center">
                                    <span className="text-white font-bold">USDT in strategies</span>
                                    <span className="text-white">{stats.total_deposited_money_into_strategies}</span>
                                </div>
                                <div className="flex h-[30px] justify-between items-center">
                                    <span className="text-white font-bold">Average strategies profit</span>
                                    <span className="text-white">{stats.total_strategies_profit}</span>
                                </div>


                            </div>
                            <div className="w-[400px] p-10 rounded-lg bg-[#142028]">
                                {stats && <PieChart data={stats.get_all_cryptos_in_percentage} />}

                            </div>


                        </div>


                        <div className=" flex flex-col gap-10 items-center justify-center w-full">
                            <div className="flex flex-col  w-[300px] h-[400px]">
                                <AddTraderModal />
                                <div className="bg-[#142028] overflow-y-auto w-full h-full rounded-b-xl shadow-lg flex flex-col">
                                    {traders && traders.map((trader) => (
                                        <TraderModal visible={trader.visible} key={trader.id} maxcopiers={trader.max_copiers} copierscount={trader.copiers_count} id={trader.id} nickname={trader.nickname} about={trader.about} register={trader.date_of_registration} photo={trader.photo} strategies={trader.strategies} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col  w-[300px] h-[360px]">
                                <AddStrategyModal />
                                <div className="bg-[#142028] w-full h-full rounded-b-xl overflow-y-auto shadow-lg flex flex-col">
                                    {strategies && strategies.map((strategy) => (
                                        <StrategyModal profits={strategy.profits} depos={strategy.total_deposited} custom={strategy.custom_avg_profit} key={strategy.id} current_copiers={strategy.total_copiers} maxCopiers={strategy.max_users} name={strategy.name} about={strategy.about} crypto={strategy.cryptos} minDepo={strategy.min_deposit} maxDepo={strategy.max_deposit} id={strategy.id} avg_profit={strategy.avg_profit} selected={(strategy.cryptos).map(crypto => crypto.name)} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            ) : (< div className="flex flex-col w-full items-center h-[100vh] pt-[90px] bg-[#0B1217] justify-start" >
                <div className="grid grid-cols-4 gap-10">
                    {traders && traders.map((trader) => (
                        <div key={trader.id} className={`${myInfo &&  myInfo[trader.id] ? 'bg-[#4e758f]' : 'bg-[#142028]'} w-[400px] h-[380px] flex flex-col  rounded-xl shadow-2xl p-5  bg-[#142028]`}>
                            <div className="flex justify-between items-start">
                                <div className="flex gap-5 items-start">
                                    <img className="w-[60px] h-[60px]" src={trader.photo} alt="" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-white font-bold text-lg">{trader.nickname}</span>
                                    </div>
                                </div>
                                <CopyModal trader={trader} />
                            </div>

                            <div className=" font-bold text-white my-5  flex items-center flex-col justify-center rounded-lg w-full ">
                                <LineChart data={trader.profits}/>
                            </div>
                   
                            <div className="flex justify-between">
                                <span className="text-white font-medium">Copiers</span>
                                <span className="text-white font-bold">{trader.copiers_count}/{trader.max_copiers}</span>

                            </div>
                        </div>
                    ))}
                </div>
            </div >)}
        </div>


    );

}