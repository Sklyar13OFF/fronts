import { useState } from "react";
import Modal from "react-modal";

import {
  CreateUserBal,
  GetDetailInfo,
  GetUserWallet,
} from "../../api/ApiWrapper";
export default function WalletModal({
  open,
  opened,
  id,
  setWallet,
  setOriginalWallet,
}) {
  const [symbol, setSymbol] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  async function handleApply() {
    open(false);

    await CreateUserBal(id, symbol, amount, network);
    await GetUserWallet(id, setWallet);
    await GetUserWallet(id, setOriginalWallet);
  }
  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => open(false)}
      className={`w-[600px]  gap-3 outline-none flex-col bg-bkg items-center rounded-xl p-4 `}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
    >
      <div className=" flex flex-col gap-5 ">
        <span className="font-medium text-xl text-root-white">
          Create user balance
        </span>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-root-white font-semibold">Symbol</span>
            <input
              type="text"
              className=" w-[300px] bg-white bg-opacity-5 h-10 rounded-lg text-root-white font-semibold outline-none px-1"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-root-white font-semibold">Network</span>
            <input
              type="text"
              className=" w-[300px] bg-white bg-opacity-5 h-10 rounded-lg text-root-white font-semibold outline-none px-1"
              value={network}
              onChange={(event) => setNetwork(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-root-white font-semibold">Quantity</span>
            <input
              type="text"
              className=" w-[300px] bg-white bg-opacity-5 h-10 rounded-lg text-root-white font-semibold outline-none px-1"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-10 items-center">
        <button
          className="w-[150px] text-light-gr font-bold"
          onClick={() => open(false)}
        >
          Close
        </button>
        <button
          className="w-[150px] text-light-gr font-bold bg-opacity-10 bg-white rounded-xl h-10"
          onClick={() => handleApply()}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
}
