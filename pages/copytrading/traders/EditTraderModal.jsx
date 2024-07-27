import { useState, useEffect } from "react";
import { EditTrader, listAllTraders } from "../../../api/ApiWrapper";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { setTraders } from "../../../src/features/traders/traderSlice";
import { ListAvailableStrategies } from "../../../api/ApiWrapper";
import { statsCopy } from "../../../api/ApiWrapper";
import { setStats } from "../../../src/features/mainStats/statsSlice";
import Image from "next/image";
export default function EditTraderModal({
  open,
  opened,
  visible,
  nickname,
  about,
  id,
  strategies,
  photo,
  copierscount,
  maxcopiers,
  deposits,
  auto,
}) {
  const dispatch = useDispatch();
  const [strategiess, setStrategies] = useState(strategies);
  const [strategiesList, setStrategiesList] = useState(null);
  const [file, setFile] = useState("");
  const [maxCopiers, setMaxCopiersCount] = useState(maxcopiers);
  const [deposit, setDeposit] = useState(deposits);
  const [username, setUsername] = useState(nickname);
  const [abouts, setAbouts] = useState(about);
  const [isVisible, setVisibility] = useState(visible);
  const [isAuto, setAuto] = useState(auto);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    setStrategies(strategies);
  }, [strategies]);

  const handleInputChange = (value, index) => {
    setStrategies((prevStrategies) => {
      const updatedStrategies = prevStrategies.map((strategy, i) => {
        if (i === index) {
          const updatedStrategy = {
            ...strategy,
            trader_deposit: parseFloat(value),
          };
          return updatedStrategy;
        }
        return strategy;
      });

      const totalDeposited = updatedStrategies.reduce((total, strategy) => {
        return total + parseFloat(strategy.trader_deposit || 0);
      }, 0);

      const strategiesWithTotalDeposited = updatedStrategies.map(
        (strategy) => ({
          ...strategy,
          total_deposited: totalDeposited.toFixed(2),
        })
      );

      console.log(strategiesWithTotalDeposited, "updated strategies");
      return strategiesWithTotalDeposited;
    });
  };
  const handleMoveToAvailable = (strategy) => {
    setStrategies((prevState) => prevState.filter((s) => s.id !== strategy.id));
    setStrategiesList((prevState) => [...prevState, strategy]);
  };
  const handleMoveToTrader = (strategy) => {
    setStrategiesList((prevState) =>
      prevState.filter((s) => s.id !== strategy.id)
    );
    setStrategies((prevState) => [...prevState, strategy]);
  };
  const handleSubmit = async (
    username,
    abouts,
    id,
    file,
    strategiess,
    maxcopiers,
    isVisible,
    deposit,
    isAuto
  ) => {
    try {
      await EditTrader(
        username,
        abouts,
        id,
        file,
        strategiess,
        maxcopiers,
        isVisible,
        deposit,
        isAuto
      );
      await listAllTraders(dispatch, setTraders);
      await statsCopy(dispatch, setStats);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  useEffect(() => {
    ListAvailableStrategies(setStrategiesList);
  }, []);

  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => open(false)}
      contentLabel="Example Modal"
      className={`w-[425px] flex gap-5 outline-none flex-col bg-bkg rounded-xl p-4 `}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
    >
      <h5 className="text-2xl text-left text-root-white font-bold">
        Edit trader
      </h5>
      <div className="flex flex-col w-full items-start gap-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-1 items-start flex-col">
                <label className="text-root-white text-xs font-semibold">
                  Username
                </label>
                <input
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  className="bg-root-input px-3 text-root-white text-xs font-semibold rounded-lg  outline-none w-[170px] h-10"
                />
              </div>
              <div className="flex gap-1 items-start flex-col">
                <label className="text-root-white text-xs font-semibold">
                  About
                </label>
                <textarea
                  style={{ resize: "none" }}
                  onChange={(event) => setAbouts(event.target.value)}
                  className="bg-root-input py-2 px-3 text-root-white text-xs rounded-lg font-semibold outline-none w-[170px] h-[90px]"
                >
                  {abouts}
                </textarea>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-root-white text-xs font-semibold">
                  Max Copiers
                </label>
                <input
                  type="number"
                  value={maxCopiers}
                  onChange={(event) => setMaxCopiersCount(event.target.value)}
                  className=" px-3 text-root-white text-xs font-semibold rounded-lg bg-root-input outline-none w-[170px] h-10"
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-5">
              <div className="upload-container">
                <label className="cursor-pointer" htmlFor="file-upload">
                  <Image
                    src="/assets/icons/upload-img.svg"
                    width={80}
                    height={80}
                  />
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept=".jpg, .jpeg, .png, .svg"
                  onChange={handleFileChange}
                  className="file-upload-input"
                />
              </div>
              <div className="flex flex-col gap-1 items-end">
                <label className="text-root-white text-xs font-semibold">
                  Auto-Trading
                </label>
                <div className="check">
                  <input
                    id="check1"
                    type="checkbox"
                    checked={isAuto}
                    onChange={() => setAuto(!isAuto)}
                  />
                  <label for="check1"></label>
                </div>
              </div>
              <div className="flex gap-1 flex-col items-end">
                <label className="text-root-white text-xs font-semibold">
                  Visibility
                </label>
                <div class="check">
                  <input
                    id="check"
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setVisibility(!isVisible)}
                  />
                  <label for="check"></label>
                </div>
              </div>
              <div className="flex gap-1 items-end flex-col">
                <label className="text-root-white text-xs font-semibold">
                  Traders deposit
                </label>
                <input
                  value={deposit}
                  type="number"
                  onChange={(event) => setDeposit(event.target.value)}
                  className="bg-root-input px-3 text-root-white text-sm rounded-lg font-semibold text-right outline-none w-[100px] h-10"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col h-[150px] overflow-y-auto bg-root-input rounded-xl">
            <label className="text-root-white p-3 text-xs font-medium">
              Trader Strategies
            </label>
            {strategiess &&
              strategiess.map((strategy, index) => (
                <div
                  className="flex  justify-between items-center  p-5"
                  key={strategy.id}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMoveToAvailable(strategy)}
                      className="bg-white hover:opacity-80 rounded-full h-[30px] w-[30px]"
                    >
                      <img
                        className="h-full w-full"
                        src="/assets/icons/chevron_down.svg"
                        alt=""
                      />
                    </button>
                    <span className="text-root-white font-medium">
                      {strategy.name}
                    </span>
                  </div>

                  <input
                    type="number"
                    className="h-[30px] w-[120px] rounded-xl outline-none text-root-white bg-root-input p-2"
                    value={strategy.trader_deposit}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col h-[150px] w-full overflow-y-auto bg-root-input rounded-xl">
            <label className="text-root-white p-3 text-xs font-medium">
              Available Strategies
            </label>

            {strategiesList &&
              strategiesList.map((strategy) => (
                <div
                  className={`text-root-white cursor-pointer h-[50px] p-5 flex items-center font-medium `}
                  key={strategy.id}
                  onClick={() => handleMoveToTrader(strategy)}
                >
                  {strategy.name}
                </div>
              ))}
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <button
            onClick={() => open(false)}
            className="text-light-gr font-medium"
          >
            Close
          </button>
          <button
            onClick={() =>
              handleSubmit(
                username,
                abouts,
                id,
                file,
                strategiess,
                maxCopiers,
                isVisible,
                deposit,
                isAuto
              )
            }
            className="w-[130px]  h-10 font-medium bg-root-blue rounded-lg text-root-white"
          >
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
}
