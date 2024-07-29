import { useState } from "react";
import EditTraderModal from "./EditTraderModal";
import Image from "next/image";
import DeleteTraderModal from "./DeleteTraderModal";
export default function TraderCard({
  photo,
  nickname,
  id,
  auto,
  strategies,
  visible,
  about,
  copiers,
  trader_deposit,
  max_copiers,
}) {
  const [opened, open] = useState(false);
  const [openedEdit, openEdit] = useState(false);
  return (
    <div className="w-[235px] h-[300px] px-5 py-3 flex flex-col justify-between bg-white bg-opacity-10 rounded-xl">
      <EditTraderModal
        id={id}
        opened={openedEdit}
        open={openEdit}
        strategies={strategies}
        auto={auto}
        visible={visible}
        nickname={nickname}
        about={about}
        deposity={trader_deposit}
        maxcopiers={max_copiers}
      />
      <DeleteTraderModal opened={opened} open={open} id={id} />
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
      <button
        onClick={() => openEdit(true)}
        className="w-full font-medium bg-root-blue text-root-white rounded-lg h-10"
      >
        Edit
      </button>
    </div>
  );
}
