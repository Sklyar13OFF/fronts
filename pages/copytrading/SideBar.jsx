import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SideBar() {
  const router = useRouter();

  return (
    <div className="sidebar">
      <Link href="/copytrading">
        <button
          className={`w-[56px] h-[56px] flex flex-col items-center justify-center ${
            router.pathname === "/copytrading" ? "blue-icon" : ""
          }`}
        >
          <Image
            src="/assets/icons/copyicon.svg"
            width={24}
            height={24}
            className="icon"
          />
        </button>
      </Link>
      <Link href="/users">
        <button
          className={`w-[56px] h-[56px] flex flex-col items-center justify-center ${
            router.pathname === "/users" ? "blue-icon" : ""
          }`}
        >
          <Image
            src="/assets/icons/line_user.svg"
            width={24}
            height={24}
            className="icon"
          />
        </button>
      </Link>
    </div>
  );
}
