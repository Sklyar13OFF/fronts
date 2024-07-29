import Image from "next/image";
import { useState } from "react";
import AddTraderModal from "./AddTraderModal";
import { useSelector } from "react-redux";
import TraderCard from "./TraderCard";
export default function TradersBlock() {
  const traders = useSelector((state) => state.traders.value);
  const [opened, open] = useState(false);

  return (
    <div className="w-[520px] h-[670px] rounded-2xl px-5 py-3 flex flex-col gap-3  bg-prim">
      <div className="flex items-center justify-between">
        <h5 className="text-light-gr  text-xl">Traders</h5>
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => open(true)}
        >
          <Image src={"/assets/icons/add.svg"} width={32} height={32} />
        </button>
      </div>
      <AddTraderModal open={open} opened={opened} />
      <div className="grid grid-cols-2 gap-3">
        {traders &&
          traders.map((item, index) => (
            <div key={index}>
              <TraderCard
                photo={item.photo}
                nickname={item.nickname}
                id={item.id}
                strategies={item.strategies}
                visible={item.visible}
                about={item.about}
                auto={item.auto_trading}
                max_copiers={item.max_copiers}
                trader_deposit={item.deposit}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
