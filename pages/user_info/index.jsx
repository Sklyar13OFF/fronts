import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WalletModal from "./WalletModal";
import {
  GetUserWallet,
  GetDetailInfo,
  ChangeUserBal,
} from "../../api/ApiWrapper";
import RankLabel from "./RankLabel";
import Image from "next/image";
function transformDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

const UserInfo = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [walletCreation, openWalletCreation] = useState(false);
  const [info, setInfo] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [originalWallet, setOriginalWallet] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setId(id);
    }
  }, [router.isReady, router.query]);
  useEffect(() => {
    if (id) {
      GetDetailInfo(id, setInfo);
      GetUserWallet(id, setWallet);
      GetUserWallet(id, setOriginalWallet);
    }
  }, [id]);

  const handleInputChange = (index, event) => {
    const newWallet = [...wallet];
    newWallet[index].total_quantity = event.target.value;
    setWallet(newWallet);
  };

  const handleButtonClick = async () => {
    console.log("Button clicked");
    for (let i = 0; i < wallet.length; i++) {
      console.log(
        `Checking ${wallet[i].symbol}: ${wallet[i].total_quantity} !== ${originalWallet[i].total_quantity}`
      );
      if (wallet[i].total_quantity !== originalWallet[i].total_quantity) {
        try {
          console.log(
            `Updating ${wallet[i].symbol} to ${wallet[i].total_quantity}`
          );
          await ChangeUserBal(id, wallet[i].symbol, wallet[i].total_quantity);
          console.log(`Updated ${wallet[i].symbol}`);
        } catch (error) {
          console.error(`Error updating ${wallet[i].symbol}:`, error);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 pt-[60px] justify-center">
      {info.user_info && (
        <div className="flex items-start gap-5">
          <div className="flex flex-col gap-5">
            <div className="bg-white bg-opacity-5 w-[1200px] flex flex-col gap-2 rounded-xl px-4 py-5">
              <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                      <div className="relative overflow-hidden">
                        {info.user_info.avatar ? (
                          <img
                            className="rounded-full w-[60px] h-[60px]"
                            src={`https://finrex.com${info.user_info.avatar}`}
                            alt="User Avatar"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <img
                            className="rounded-full w-[60px] h-[60px]"
                            src="/assets/icons/line_user.svg"
                            alt="User Avatar"
                            style={{ objectFit: "cover" }}
                          />
                        )}

                        {info.user_info.verification_status === "approved" ? (
                          <img
                            src={`/assets/icons/checkmark_dark.svg`}
                            alt="Verified"
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                        ) : (
                          <img
                            src={`/assets/icons/danger_dark.svg`}
                            style={{
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <h5 className="text-root-white font-semibold text-xl">
                              {info.user_info.nickname}
                            </h5>
                            {info.user_settings && (
                              <RankLabel rank={info.user_settings.rank} />
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <Image
                              src="/assets/icons/mail.svg"
                              width={20}
                              height={20}
                            />
                            <span className="font-semibold text-root-white">
                              {info.user_info.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <WalletModal
                      open={openWalletCreation}
                      opened={walletCreation}
                      id={id}
                      setWallet={setWallet}
                      setOriginalWallet={setOriginalWallet}
                    />
                    <div className="flex items-center gap-2">
                      {info.user_info.is_active ? (
                        <div className="w-5 h-5 bg-root-green rounded-full" />
                      ) : (
                        <div className="w-5 h-5 bg-root-red rounded-full" />
                      )}
                      <span className="text-root-white font-semibold">
                        Activity
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-2xl text-root-white font-semibold">
                        {info.user_settings.currency}
                      </span>
                      <span className="text-root-green font-semibold">
                        Main currency
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-5">
                    <div className="flex flex-col items-end">
                      <span className="text-root-white text-xl font-semibold">
                        {info.user_info.internal_id}
                      </span>
                      <span className="text-light-gr text-sm font-medium">
                        Finrex-ID
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-root-white text-xl font-semibold">
                        {info.user_info.personal_manager}
                      </span>
                      <span className="text-light-gr text-sm font-medium">
                        Personal manager
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-root-white text-2xl font-semibold">
                          {info.user_info.vault_id}
                        </span>
                        <span className="text-light-gr text-sm font-semibold">
                          Vault ID
                        </span>
                      </div>
                      <Image
                        src={"/assets/icons/fb_logo.jpg"}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-root-white text-lg font-semibold">
                        {info.user_info.referral_code}
                      </span>
                      <Image
                        src={"/assets/icons/referral.svg"}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-root-white text-lg font-semibold">
                        {info.user_info.secret}
                      </span>
                      <Image
                        src={"/assets/icons/auth.svg"}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-root-white text-lg font-semibold">
                        {transformDate(info.user_info.data_joined)}
                      </span>
                      <Image
                        src={"/assets/icons/calendar.svg"}
                        width={32}
                        height={32}
                      />
                    </div>
                    <svg
                      className={`${
                        info.user_info.available_gift
                          ? "text-root-green"
                          : "text-root-red"
                      } w-10 h-10`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </div>
                </div>

                {info.user_info.phone && (
                  <div className="flex items-center gap-1">
                    <span className="text-root-white text-sm">
                      {info.user_info.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {info.user_settings && (
              <div className="flex items-center w-[1200px] gap-4">
                <div className="bg-white bg-opacity-5 flex flex-col gap-2 rounded-xl px-4 py-5 h-[124px]">
                  <div className="rounded-xl p-3 flex flex-col gap-1 bg-white bg-opacity-10">
                    <span className="text-root-green text-2xl font-medium">
                      {info.user_settings.staking_rewards}%
                    </span>
                    <span className="text-root-white font-medium">
                      Staking rewards
                    </span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-5 flex flex-col gap-2 rounded-xl px-4 py-5 h-[124px]">
                  <div className="rounded-xl p-3 flex flex-col gap-1 bg-white bg-opacity-10">
                    <span className="text-root-green text-2xl font-medium">
                      {info.user_settings.copy_fee}%
                    </span>
                    <span className="text-root-white font-medium">
                      Copytrading fee
                    </span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-5 flex flex-col gap-2 rounded-xl px-4 py-5 h-[124px]">
                  <div className="rounded-xl p-3 flex flex-col gap-1 bg-white bg-opacity-10">
                    <span className="text-root-green text-2xl font-medium">
                      {info.user_settings.taker_fee}%
                    </span>
                    <span className="text-root-white font-medium">
                      Taker fee
                    </span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-5 flex flex-col gap-2 rounded-xl px-4 py-5 h-[124px]">
                  <div className="rounded-xl p-3 flex flex-col gap-1 bg-white bg-opacity-10">
                    <span className="text-root-green text-2xl font-medium">
                      {info.user_settings.maker_fee}%
                    </span>
                    <span className="text-root-white font-medium">
                      Maker fee
                    </span>
                  </div>
                </div>
                <div className="bg-white bg-opacity-5 flex flex-col gap-2 rounded-xl px-4 py-5 h-[124px]">
                  <div className="rounded-xl p-3 flex flex-col gap-1 bg-white bg-opacity-10">
                    {info.user_settings.no_with_fee ? (
                      <div className="w-5 h-5 bg-root-green rounded-full" />
                    ) : (
                      <div className="w-5 h-5 bg-root-red rounded-full" />
                    )}
                    <span className="text-root-white font-medium">
                      No withdrawal fees
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white bg-opacity-5 w-[400px] flex flex-col justify-between rounded-xl px-4 py-2">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h5 className="text-root-white font-semibold text-2xl">
                  Wallet
                </h5>
                <Image
                  onClick={() => openWalletCreation(true)}
                  src="/assets/icons/add.svg"
                  className="cursor-pointer"
                  width={30}
                  height={30}
                />
              </div>
              <div className="grid grid-cols-3 gap-5 py-5">
                {wallet &&
                  wallet.map((item, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Image
                          width={30}
                          height={30}
                          src={`/assets/icons/${item.symbol.toLowerCase()}.png`}
                        />
                        <span className="text-root-white text-xl font-semibold">
                          {item.symbol}
                        </span>
                      </div>
                      <input
                        type="text"
                        onChange={(event) => handleInputChange(index, event)}
                        value={item.total_quantity}
                        className="bg-white bg-opacity-10 font-semibold rounded-lg outline-none h-10 text-root-white px-1"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full bg-root-blue rounded-xl text-root-white font-semibold h-10"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
