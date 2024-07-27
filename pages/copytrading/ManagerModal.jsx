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
                <Image
                  src="/assets/icons/upload-img.svg"
                  width={80}
                  height={80}
                />
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
