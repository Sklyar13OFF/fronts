import { useState } from "react";
import "../globals.css";
import { AddManager } from "../../api/ApiWrapper";
import Image from "next/image";
import Modal from "react-modal";
import { GetManagers } from "../../api/ApiWrapper";
export default function AddManagerModal({ setManagers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleAddManager = async () => {
    await AddManager(name, email, photo);
    setIsOpen(false);
    await GetManagers(setManagers);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center"
      >
        <Image width={32} height={32} src="/assets/icons/add.svg" />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => open(false)}
        className={`w-[450px]  gap-3 outline-none flex-col bg-bkg items-center rounded-xl p-4 `}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
      >
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-root-white p-5 text-xl">
            Add new manager
          </h5>
          <button onClick={() => setIsOpen(false)}>
            <img
              className="h-5 w-5 mr-5"
              src="/assets/icons/close.svg"
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex items-center justify-between w-[90%]">
            <div className="flex flex-col gap-5">
              <div className="flex  flex-col gap-1">
                <span className="font-medium text-root-white text-sm">
                  Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className=" h-10 outline-none bg-prim px-2 text-root-white font-medium rounded-lg"
                />
              </div>
              <div className="flex  flex-col gap-1">
                <span className="font-medium text-root-white text-sm">
                  E-Mail
                </span>
                <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className=" h-10 outline-none bg-prim px-2 text-root-white font-medium rounded-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="file-input" className="cursor-pointer">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="7.5"
                    stroke="#E8EBF1"
                    stroke-dasharray="5 5"
                  />
                  <path
                    d="M17.5 30H23.5C28.5 30 30.5 28 30.5 23V17C30.5 12 28.5 10 23.5 10H17.5C12.5 10 10.5 12 10.5 17V23C10.5 28 12.5 30 17.5 30Z"
                    stroke="#E8EBF1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17.5 18C18.6046 18 19.5 17.1046 19.5 16C19.5 14.8954 18.6046 14 17.5 14C16.3954 14 15.5 14.8954 15.5 16C15.5 17.1046 16.3954 18 17.5 18Z"
                    stroke="#E8EBF1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.1719 26.9501L16.1019 23.6401C16.8919 23.1101 18.0319 23.1701 18.7419 23.7801L19.0719 24.0701C19.8519 24.7401 21.1119 24.7401 21.8919 24.0701L26.0519 20.5001C26.8319 19.8301 28.0919 19.8301 28.8719 20.5001L30.5019 21.9001"
                    stroke="#E8EBF1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button
            onClick={handleAddManager}
            className="w-[90%] bg-white bg-opacity-10 h-[40px] mt-2 font-bold  rounded-lg text-root-white"
          >
            ADD
          </button>
        </div>
      </Modal>
    </div>
  );
}
