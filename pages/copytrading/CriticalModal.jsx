import Modal from "react-modal";
import { BlockDeleteUsers } from "../../api/ApiWrapper";
export default function CriticalModal({ option, list, open, opened }) {
  async function handleConfirmation() {
    await BlockDeleteUsers(option, list);
    open(false);
  }
  return (
    <Modal
      isOpen={opened}
      onRequestClose={() => open(false)}
      contentLabel="Example Modal"
      className={`w-[425px] flex gap-3 outline-none flex-col bg-bkg items-center rounded-xl p-4 `}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[10004]"
    >
      {list && (
        <div className="flex flex-col gap-6 items-center justify-center">
          <h5 className="text-center text-root-white font-bold text-2xl">
            Are you sure, you want to{" "}
            {option == "UNBLOCK" ? (
              <span className="text-root-green">{option}</span>
            ) : (
              <span className="text-root-red">{option}</span>
            )}{" "}
            {list.length > 1 ? "these" : "this"} {list.length}{" "}
            {list.length > 1 ? "users" : "user"}
          </h5>
          <div className="flex items-center justify-between gap-[100px]">
            <button
              onClick={() => handleConfirmation()}
              className="w-[120px] h-10 rounded-xl bg-root-red text-prim font-bold"
            >
              YES
            </button>
            <button
              onClick={() => open(false)}
              className="w-[120px] h-10 rounded-xl bg-root-green text-prim font-bold"
            >
              {" "}
              NO
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
