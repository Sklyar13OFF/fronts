import { useState, useEffect } from "react";
export default function ManagersStats({
  total_managers,
  users_w_managers,
  users_wout_managers,
}) {
  const [perc, setPerc] = useState(0);
  useEffect(() => {
    setPerc(parseInt((users_w_managers * 100) / users_wout_managers));
  }, []);
  return (
    <div className="w-[600px] bg-prim rounded-xl px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-1 ">
          <span className="text-root-white text-[32px]">{total_managers}</span>
          <span className="text-light-gr ">Managers count</span>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center w-full justify-between">
            <span className="text-root-white">
              With Managers <span className="text-root-blue">{perc}%</span>
            </span>
            <span className="text-light-gr">
              {users_w_managers} / {users_wout_managers}
            </span>
          </div>
          <div className="w-full rounded-[4px] bg-white bg-opacity-10 h-2">
            <div
              style={{ width: `${perc}%` }}
              className={` h-2 rounded-[4px] bg-root-blue`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
