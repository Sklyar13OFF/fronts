import { useState, useEffect } from "react";
import TraderModal from "./TraderModal";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";
import StrategyModal from "./StrategyModal";
import "../globals.css";
import ManagersTable from "./managers/ManagersTable";
import CopyModal from "./CopyModal";
import AddStrategyModal from "./AddStrategyModal";
import { MyTraders } from "../../api/ApiWrapper";
import LineChart from "./LineChart";
import DoughnutChart from "./PieChartPerc";

import { getServerSideProps as checkAuth } from "../../api/authCheck";
import TradersBlock from "./traders/TradersBlock";
import TradingStats from "./traders/TradingStats";
export const getServerSideProps = async (context) => {
  return checkAuth(context);
};
export default function CopyTrading() {
  const [myInfo, setMyInfo] = useState({});
  const strategies = useSelector((state) => state.strategies.value);
  const stats = useSelector((state) => state.stats.value);

  return (
    <div>
      <div className="flex flex-col w-full items-center md:h-[100vh] pt-[90px] bg-bkg justify-start">
        <div className=" gap-5 flex-col md:flex-row flex  items-start justify-center">
          <div className="flex flex-col gap-5">
            <TradingStats />
            <div className="flex items-start gap-5">
              <div className="flex flex-col gap-5">
                <ManagersTable />
                <div className="w-[600px] p-10 rounded-xl bg-prim">
                  {stats && (
                    <DoughnutChart
                      rawData={stats.get_all_cryptos_in_percentage}
                    />
                  )}
                </div>
              </div>
              <TradersBlock />
            </div>
          </div>

          <div className=" flex flex-col gap-10 items-center justify-center ">
            <div className="flex flex-col  w-[300px] h-[300px]">
              {/* <div className="bg-[#142028] overflow-y-auto w-full h-full rounded-b-xl shadow-lg flex flex-col">
                {traders &&
                  traders.map((trader) => (
                    <TraderModal
                      auto={trader.auto_trading}
                      visible={trader.visible}
                      key={trader.id}
                      maxcopiers={trader.max_copiers}
                      copierscount={trader.copiers_count}
                      id={trader.id}
                      nickname={trader.nickname}
                      about={trader.about}
                      register={trader.date_of_registration}
                      photo={trader.photo}
                      strategies={trader.strategies}
                      deposits={trader.deposit}
                    />
                  ))}
              </div> */}
            </div>
            <div className="flex flex-col  w-[300px] h-[360px]">
              <AddStrategyModal />
              <div className="bg-[#142028] w-full h-full rounded-b-xl overflow-y-auto shadow-lg flex flex-col">
                {strategies &&
                  strategies.map((strategy) => (
                    <StrategyModal
                      profits={strategy.profits}
                      depos={strategy.total_deposited}
                      custom={strategy.custom_avg_profit}
                      key={strategy.id}
                      current_copiers={strategy.total_copiers}
                      maxCopiers={strategy.max_users}
                      name={strategy.name}
                      about={strategy.about}
                      crypto={strategy.cryptos}
                      minDepo={strategy.min_deposit}
                      maxDepo={strategy.max_deposit}
                      id={strategy.id}
                      avg_profit={strategy.avg_profit}
                      selected={strategy.cryptos.map((crypto) => crypto.name)}
                      deposits={strategy.trader_deposit}
                      pool={strategy.available_pool}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
