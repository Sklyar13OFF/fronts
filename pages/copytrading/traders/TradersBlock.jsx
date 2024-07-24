import Image from "next/image";
import { useSelector } from "react-redux";
export default function TradersBlock() {
  const traders = useSelector((state) => state.traders.value);

  return (
    <div className="w-[520px] h-[670px] rounded-2xl px-5 py-3 flex flex-col gap-3  bg-prim">
      <div className="flex items-center justify-between">
        <h5 className="text-light-gr  text-xl">Traders</h5>
        <button
          className="flex flex-col items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Image src={"/assets/icons/add.svg"} width={32} height={32} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {traders &&
          traders.map((item, index) => (
            <div
              key={index}
              className="w-[235px] h-[300px] px-5 py-3  bg-white bg-opacity-10 rounded-xl"
            >
              <div className="flex items-center gap-2 ">
                <img src={item.photo} className="w-8 h-8 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-root-white text-sm font-semibold">
                    {item.nickname}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
