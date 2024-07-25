import Modal from "react-modal";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AddTrader } from "../../../api/ApiWrapper";
import { listAllStrategies } from "../../../api/ApiWrapper";
import { useDispatch } from "react-redux";
import { ListAvailableStrategies } from "../../../api/ApiWrapper";
export default function AddTraderModal({ open, opened }) {
  const dispatch = useDispatch();
  const [deposit, setDeposit] = useState(0);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [strategiess, setStrategies] = useState([]);
  const [strategiesList, setStrategiesList] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const handleMoveToAvailable = (strategy) => {
    strategy.trader_deposit = "0";
    setStrategies((prevState) => prevState.filter((s) => s.id !== strategy.id));
    setStrategiesList((prevState) => [...prevState, strategy]);
  };
  const handleInputChange = (value, index) => {
    setStrategies((prevStrategies) => {
      const updatedStrategies = prevStrategies.map((strategy, i) => {
        if (i === index) {
          // Update the trader_deposit value
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

      return strategiesWithTotalDeposited;
    });
  };

  const handleMoveToTrader = (strategy) => {
    const { trader_deposit, ...strategyWithoutDeposit } = strategy;
    setStrategiesList((prevState) =>
      prevState.filter((s) => s.id !== strategy.id)
    );
    setStrategies((prevState) => [...prevState, strategyWithoutDeposit]);
  };

  useEffect(() => {
    ListAvailableStrategies(setStrategiesList);
  }, []);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddTrader = async (
    username,
    about,
    file,
    strategiesList,
    deposit
  ) => {
    await AddTrader(username, about, file, strategiesList, deposit);
    await listAllTraders(dispatch, setTraders);
    setIsOpen(false);
    await statsCopy(dispatch, setStats);
  };
  useEffect(() => {
    if (
      username.trim() !== "" &&
      about.trim() !== "" &&
      strategiess.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, about, strategiess]);
  return (
    <div>
      <Modal
        isOpen={opened}
        onRequestClose={() => open(false)}
        className={`w-[550px]  gap-3 outline-none flex-col bg-bkg items-center rounded-xl p-4 `}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
      >
        <div className="flex flex-col w-full items-start gap-8 p-6">
          <span className="text-2xl text-root-white font-bold">
            Add new trader
          </span>
          <div className="flex w-full gap-2">
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full items-start gap-2">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex gap-1 items-start flex-col">
                    <label className="text-root-white text-sm font-semibold">
                      Username
                    </label>
                    <input
                      onChange={(event) => setUsername(event.target.value)}
                      className="bg-prim px-3 text-root-white text-sm font-semibold rounded-lg  outline-none w-[200px] h-8"
                    />
                  </div>
                  <div className="flex gap-1 items-start flex-col">
                    <label className="text-root-white text-sm font-semibold">
                      Traders deposit
                    </label>
                    <input
                      onChange={(event) => setDeposit(event.target.value)}
                      className="bg-prim py-2 px-3 text-root-white text-sm font-semibold rounded-lg  outline-none w-[200px] h-8"
                    />
                  </div>
                  <div className="flex gap-1 items-start flex-col">
                    <label className="text-root-white text-sm font-semibold">
                      About
                    </label>
                    <textarea
                      style={{ resize: "none" }}
                      onChange={(event) => setAbout(event.target.value)}
                      className="bg-prim py-2 px-3 text-root-white text-sm font-semibold rounded-lg  outline-none w-[200px] h-[80px]"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-end w-full flex-col gap-2">
                  <div className="upload-container">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Image
                        height={40}
                        width={40}
                        src="/assets/icons/upload.svg"
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
                  <div className="flex flex-col w-full h-[185px] overflow-y-auto bg-prim rounded-xl">
                    <label className="text-root-white py-2 px-2 font-semibold text-sm">
                      Trader strategies
                    </label>
                    {strategiess &&
                      strategiess.map((strategy, index) => (
                        <div
                          key={index}
                          className="flex justify-between px-5 border-b border-white"
                        >
                          <div className="flex items-start gap-2">
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
                          </div>

                          <div
                            className={`text-root-white h-[50px] p-5  rounded-lg flex items-center font-medium bg-prim`}
                            key={strategy.id}
                            onClick={() => handleMoveToAvailable(strategy)}
                          >
                            {strategy.name}
                          </div>
                          <input
                            type="number"
                            className="w-[120px] text-root-white p-2 h-[30px] bg-[#142028] rounded-xl outline-none"
                            onChange={(e) =>
                              handleInputChange(e.target.value, index)
                            }
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-[200px] w-full overflow-y-auto bg-prim rounded-xl">
                <label className="text-root-white py-2 px-2 font-semibold text-sm">
                  Available strategies
                </label>

                {strategiesList &&
                  strategiesList.map((strategy) => (
                    <div
                      className={`text-root-white h-[50px] p-5 border-b border-white rounded-lg flex items-center font-medium `}
                      key={strategy.id}
                      onClick={() => handleMoveToTrader(strategy)}
                    >
                      {strategy.name}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between mt-4">
            <button
              onClick={() => open(false)}
              className="text-light-gr font-bold "
            >
              Close
            </button>
            <button
              disabled={disabled}
              onClick={() =>
                handleAddTrader(username, about, file, strategiess, deposit)
              }
              className="w-[120px] h-10 bg-white bg-opacity-15 rounded-2xl disabled:opacity-25 text-light-gr"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
