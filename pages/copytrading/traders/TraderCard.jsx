import { useState } from "react";
import Image from "next/image";
import DeleteTraderModal from "./DeleteTraderModal";
export default function TraderCard({ photo, nickname, id }) {
  const [opened, open] = useState(false);
  return (
    <div className="w-[235px] h-[300px] px-5 py-3  bg-white bg-opacity-10 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <img src={photo} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col">
            <span className="text-root-white text-sm font-semibold">
              {nickname}
            </span>
            <div className=""></div>
          </div>
        </div>{" "}
        <Image
          src="/assets/icons/del.svg"
          width={32}
          onClick={() => open(true)}
          height={32}
          className="cursor-pointer"
        />
      </div>
      <DeleteTraderModal opened={opened} open={open} id={id} />
    </div>
  );
}
