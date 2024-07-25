import { GetManagers } from "../../../api/ApiWrapper";
import { useEffect, useState } from "react";
import Image from "next/image";
import AddManagerModal from "../ManagerModal";
import DeleteManagerModal from "./DeleteManagerModal";
export default function ManagersTable() {
  const [managers, setManagers] = useState([]);
  const [opened, open] = useState(false);
  useEffect(() => {
    GetManagers(setManagers);
  }, []);
  return (
    <div className="bg-prim w-[600px] rounded-xl flex flex-col px-5 py-3">
      <div className="flex items-center gap-4">
        <div className=" flex flex-col w-full gap-3">
          <div className="flex item-center justify-between w-full">
            <span className="text-light-gr  text-xl">Managers</span>
            <AddManagerModal setManagers={setManagers} />
          </div>
          <div className="w-full grid grid-cols-2 h-[300px] max-h-[300px] overflow-x-hidden overflow-y-auto gap-x-2 gap-y-2 ">
            {managers &&
              managers.length > 0 &&
              managers.map((item, index) => (
                <div
                  key={index}
                  className="w-[265px] h-[200px] px-3 bg-white bg-opacity-5 rounded-xl py-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1">
                      <img
                        src={item.avatar}
                        alt=""
                        className="rounded-full w-[64px] h-[64px]"
                      />
                      <div className="flex flex-col gap-1">
                        <h5 className="text-root-white">{item.name}</h5>
                        <div className="flex items-center gap-1">
                          <Image
                            height={16}
                            width={16}
                            src="/assets/icons/mail.svg"
                          />
                          <h5 className="text-root-white text-sm font-medium">
                            {item.email}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <Image
                      src="/assets/icons/del.svg"
                      width={32}
                      onClick={() => open(true)}
                      height={32}
                      className="cursor-pointer"
                    />
                    <DeleteManagerModal
                      opened={opened}
                      open={open}
                      id={item.id}
                      setManagers={setManagers}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
