import Modal from "react-modal";
import Image from "next/image";
export default function WalletModal({ opened, open, list }) {
  function handleApply() {
    open(false);
  }
  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => open(false)}
      className={`w-[600px]  gap-3 outline-none flex-col bg-bkg items-center rounded-xl p-4 `}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
    >
      <div className="grid grid-cols-2 gap-5 p-10">
        {list &&
          list.map((item, index) => (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={`/assets/icons/${item.symbol.toLowerCase()}.png`}
                  width={24}
                  height={24}
                />
                <span className="font-bold text-root-white text-lg">
                  {item.symbol}
                </span>
              </div>
              <input
                type="number"
                value={item.total_quantity}
                className="bg-white bg-opacity-10 rounded-xl text-light-gr h-10 px-2 font-medium w-[190px] outline-none"
              />
            </div>
          ))}
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
