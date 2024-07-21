import { useEffect, useState } from "react";
import WalletModal from "@/copytrading/WalletModal";
import {
  UsersInfo,
  UsersTotalInfo,
  UserStats,
  UsersList,
  GetUserWallet,
} from "../../api/ApiWrapper";
import { Tooltip } from "react-tooltip";
import CriticalModal from "@/copytrading/CriticalModal";
import { getServerSideProps as checkAuth } from "../../api/authCheck";
import Image from "next/image";
import CustomBox from "@/copytrading/CustomBox";

export const getServerSideProps = async (context) => {
  return checkAuth(context);
};

export default function Users() {
  const [infoTotal, setTotalInfo] = useState("");
  const [info, setInfo] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [userStats, setStats] = useState({});
  const [list, setList] = useState([]);
  const [walletList, setWalletList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [option, setOption] = useState("BLOCK");
  const [searchParam, setSearchParam] = useState("nickname");
  const [openedWallet, openWallet] = useState(false);
  const [openedCritical, openCritical] = useState(false);

  function handleSearch() {
    if (searchText) {
      setPage(1);
    }
    UsersList(setList, 1, setTotalPages, searchParam, searchText, setPage);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
  };

  useEffect(() => {
    UsersList(setList, page, setTotalPages, searchParam, searchText, setPage);
  }, [page]);

  const scrollPage = (next) => {
    if (next === true) {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
  };

  const populateIdsList = (finrexId) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(finrexId)) {
        return prevSelectedIds.filter((id) => id !== finrexId);
      } else {
        return [...prevSelectedIds, finrexId];
      }
    });
  };

  async function eyeClick(finrexID) {
    openWallet(true);
    await GetUserWallet(finrexID, setWalletList);
  }
  useEffect(() => {
    UsersInfo(setInfo);
    UsersTotalInfo(setTotalInfo);
    UserStats(setStats);
  }, []);

  return (
    <div className="bg-bkg flex gap-10 items-center flex-col justify-center h-[100vh] w-full">
      <div className="w-[648px] h-[342px] bg-prim rounded-[20px] flex flex-col ">
        <div className="items-start p-4 flex border-b border-white border-opacity-5">
          <span className="text-root-white font-medium text-xl">Info</span>
        </div>
        <div className="grid grid-cols-2 gap-y-8 p-3">
          <div className="flex flex-col gap-1">
            <span className="text-root-white text-[32px]">
              {userStats.total_users_count}
            </span>
            <span className="text-light-gr">Amount of users</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-root-green text-[32px]">
              {userStats.total_users_balance}
            </span>
            <span className="text-light-gr">Total Balance</span>
          </div>
        </div>
      </div>
      <div className="bg-prim w-[1320px] p-4 h-[538px] rounded-[20px]">
        <div className="flex items-center gap-5">
          <div className="w-full bg-white bg-opacity-5 h-10 rounded-xl p-6 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none text-root-white placeholder:text-gr font-medium w-full"
            />
            <Image src="/assets/icons/search.svg" width={32} height={24} />
          </div>
          {selectedIds.length > 0 ? (
            option === "BLOCK" ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openCritical(true)}
                  className="w-[121px] h-10 bg-root-red rounded-xl text-prim font-bold"
                >
                  Block
                </button>
                <Image
                  onClick={() => setOption("UNBLOCK")}
                  className="cursor-pointer"
                  src="/assets/icons/chevron-right.svg"
                  width={24}
                  height={24}
                />
              </div>
            ) : option === "UNBLOCK" ? (
              <div className="flex items-center gap-1">
                <Image
                  onClick={() => setOption("BLOCK")}
                  className="cursor-pointer"
                  src="/assets/icons/chevron-left.svg"
                  width={24}
                  height={24}
                />
                <button
                  onClick={() => openCritical(true)}
                  className="w-[121px] h-10 bg-root-green rounded-xl text-prim font-bold"
                >
                  Unblock
                </button>
                <Image
                  onClick={() => setOption("DELETE")}
                  className="cursor-pointer"
                  src="/assets/icons/chevron-right.svg"
                  width={24}
                  height={24}
                />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Image
                  onClick={() => setOption("UNBLOCK")}
                  className="cursor-pointer"
                  src="/assets/icons/chevron-left.svg"
                  width={24}
                  height={24}
                />
                <button
                  onClick={() => openCritical(true)}
                  className="w-[121px] h-10 bg-root-red rounded-xl text-prim font-bold"
                >
                  Delete
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => handleSearch()}
              className="w-[121px] h-10 bg-root-white rounded-xl text-prim font-bold"
            >
              Search
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 justify-center mt-5">
          <div className="h-[350px]">
            <table className="table-fixed ">
              <thead>
                <tr className="h-[56px]">
                  <th className="w-12"></th>
                  <th className="text-gr max-w-[140px] w-[140px] font-normal text-left">
                    Nickname
                  </th>
                  <th className="text-gr font-normal text-left">E-Mail</th>
                  <th className="text-gr font-normal text-left">Phone</th>
                  <th className="text-gr font-normal text-left">Finrex-ID</th>
                  <th className="text-gr font-normal text-left w-[140px]">
                    Joined
                  </th>
                  <th className="text-gr font-normal text-left">Active</th>
                  <th className="text-gr font-normal text-left">Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.length > 0 &&
                  list.map((item, index) => (
                    <tr className="h-[56px] w-full" key={index}>
                      <td
                        className="w-12 h-[56px]"
                        onClick={() => populateIdsList(item.internal_id)}
                      >
                        <CustomBox
                          filled={selectedIds.includes(item.internal_id)}
                        />
                      </td>
                      <td
                        data-tooltip-id={`nick_${index}`}
                        data-tooltip-content={item.nickname}
                        className="text-light-gr max-w-[140px] w-[140px] truncate overflow-hidden text-ellipsis whitespace-nowrap pr-5"
                      >
                        {item.nickname}
                      </td>
                      <td
                        data-tooltip-id={`email_${index}`}
                        data-tooltip-content={item.email}
                        className="text-light-gr max-w-[230px] w-[230px] truncate overflow-hidden text-ellipsis whitespace-nowrap pr-5"
                      >
                        {item.email}
                      </td>

                      <td className="text-light-gr w-[177px]">{item.phone}</td>
                      <td className="text-light-gr w-[240px]">
                        {item.internal_id}
                      </td>
                      <td className="text-light-gr w-[140px] pr-5">
                        {formatDate(item.date_joined)}
                      </td>
                      <td className="w-[80px]">
                        {item.is_active ? (
                          <div className="w-5 h-5 rounded-full bg-root-green" />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-root-red" />
                        )}
                      </td>
                      <td className="text-root-green font-semibold pr-5">
                        {parseFloat(item.total_money).toFixed(2)}
                      </td>
                      <td>
                        <button onClick={() => eyeClick(item.internal_id)}>
                          {" "}
                          <Image
                            className="cursor-pointer icon"
                            src="/assets/icons/eye.svg"
                            width={24}
                            height={24}
                          />
                        </button>
                      </td>
                      <Tooltip id={`email_${index}`} />
                      <Tooltip id={`nick_${index}`} />
                    </tr>
                  ))}
                {list && list.length === 1 && (
                  <tr className="h-[56px]">
                    <td colSpan="8" className="h-[56px]"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchParam("nickname")}
                className={`px-4 py-2 rounded-xl flex flex-col items-center justify-center bg-white bg-opacity-10 ${
                  searchParam == "nickname" ? "border-2 border-root-blue" : ""
                }`}
              >
                <span
                  className={` font-medium  ${
                    searchParam == "nickname"
                      ? "text-root-white"
                      : "text-light-gr"
                  }`}
                >
                  Nickname
                </span>
              </button>
              <button
                onClick={() => setSearchParam("email")}
                className={`px-4 py-2 rounded-xl flex flex-col items-center justify-center bg-white bg-opacity-10 ${
                  searchParam == "email" ? "border-2 border-root-blue" : ""
                }`}
              >
                <span
                  className={` font-medium  ${
                    searchParam == "email" ? "text-root-white" : "text-light-gr"
                  }`}
                >
                  E-Mail
                </span>
              </button>
              <button
                onClick={() => setSearchParam("phone")}
                className={`px-4 py-2 rounded-xl flex flex-col items-center justify-center bg-white bg-opacity-10 ${
                  searchParam == "phone" ? "border-2 border-root-blue" : ""
                }`}
              >
                <span
                  className={` font-medium  ${
                    searchParam == "phone" ? "text-root-white" : "text-light-gr"
                  }`}
                >
                  Phone
                </span>
              </button>
              <button
                onClick={() => setSearchParam("internal_id")}
                className={`px-4 py-2 rounded-xl flex flex-col items-center justify-center bg-white bg-opacity-10 ${
                  searchParam == "internal_id"
                    ? "border-2 border-root-blue"
                    : ""
                }`}
              >
                <span
                  className={` font-medium  ${
                    searchParam == "internal_id"
                      ? "text-root-white"
                      : "text-light-gr"
                  }`}
                >
                  Finrex-ID
                </span>
              </button>
            </div>
            <div className="px-3 py-1 bg-white bg-opacity-10 rounded-xl inline-flex justify-center items-center gap-2">
              {page == 1 ? (
                <Image
                  src="/assets/icons/chevron-l-block.svg"
                  width={24}
                  className="cursor-pointer"
                  height={24}
                />
              ) : (
                <Image
                  src="/assets/icons/chevron-left.svg"
                  width={24}
                  className="cursor-pointer"
                  height={24}
                  onClick={() => scrollPage(false)}
                />
              )}
              <span className="text-root-white">
                {page} / {totalPages}
              </span>
              {page == totalPages ? (
                <Image
                  src="/assets/icons/chevron-r-block.svg"
                  width={24}
                  className="cursor-pointer"
                  height={24}
                />
              ) : (
                <Image
                  src="/assets/icons/chevron-right.svg"
                  width={24}
                  className="cursor-pointer"
                  height={24}
                  onClick={() => scrollPage(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <CriticalModal
        option={option}
        list={selectedIds}
        opened={openedCritical}
        open={openCritical}
      />
      <WalletModal list={walletList} opened={openedWallet} open={openWallet} />
    </div>
  );
}
