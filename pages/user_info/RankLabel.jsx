const rankDict = {
  SILVER: "bg-text-root-gr",
  GOLD: "bg-[#E2A226]",
  ELITE: "bg-[#AE35D8]",
  PLATINUM: "bg-[#968474]",
  NEW: "bg-[#6180F0]",
  VIP: "bg-[#F0616D]",
};

export default function RankLabel({ rank }) {
  return (
    <div
      className={`  h-4 flex flex-col items-center justify-center rounded-[5px] ${
        rank && rankDict[rank.toUpperCase()]
      }`}
    >
      <span className="upper text-bkg font-bold text-xs px-1">{rank}</span>
    </div>
  );
}
