export default function CustomBox({ filled }) {
  return (
    <div className="w-8 h-8 rounded-lg bg-white bg-opacity-10 flex cursor-pointer flex-col items-center justify-center parent-box">
      <div
        className={`w-5 h-5  rounded-[6px] child-box ${
          filled ? "bg-root-blue" : "bg-white bg-opacity-15"
        }`}
      ></div>
    </div>
  );
}
