import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Image from "next/image";
import { SetThreshold, GetThreshold } from "../../../api/ApiWrapper";
export default function TradingStats() {
  const stats = useSelector((state) => state.stats.value);
  const [thres, setThres] = useState(0);
  const [input, openInput] = useState(false);

  useEffect(() => {
    GetThreshold(setThres);
  }, []);
  function handleClick() {
    openInput(false);
    SetThreshold(thres);
  }
  return (
    <div className="w-[1140px] rounded-xl bg-prim flex items-center gap-11 px-5 py-3">
      <div className="flex flex-col gap-1">
        <span className="text-root-white text-[32px]">
          {stats.traders_count}
        </span>

        <span className="text-light-gr">Traders Amount</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-root-green text-[32px]">
          {stats.total_deposited_money_into_strategies}
        </span>

        <span className="text-light-gr">Total USDT in strategies</span>
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={`${
            parseFloat(stats.total_strategies_profit) >= 0
              ? "text-root-green"
              : "text-root-red"
          } text-[32px]`}
        >
          {parseFloat(stats.total_strategies_profit) >= 0 && "+"}
          {stats.total_strategies_profit}%
        </span>

        <span className="text-light-gr">Average strategies profit</span>
      </div>
      <div className="flex items-end gap-5">
        <div className="flex flex-col w-[150px] gap-1">
          {input ? (
            <input
              type="number"
              value={thres}
              onChange={(event) => setThres(event.target.value)}
              className="rounded-xl outline-none h-12 w-[150px] text-root-white text-[32px] px-1 bg-white bg-opacity-10"
            />
          ) : (
            <span className="text-root-white text-[32px]">{thres}</span>
          )}

          <span className="text-light-gr">Trending threshold</span>
        </div>
        <button className="cursor-pointer">
          {input ? (
            <Image
              src={"/assets/icons/white_mark.svg"}
              onClick={() => handleClick()}
              width={24}
              height={24}
            />
          ) : (
            <Image
              src={"/assets/icons/edit.svg"}
              onClick={() => openInput(true)}
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
    </div>
  );
}
