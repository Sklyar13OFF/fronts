import { Inter } from "next/font/google";
import "./globals.css";
import 'tailwindcss/tailwind.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html className='  bg-[#0B1217]' lang="en">
      <body className={`${inter.className} bg-[#0B1217]`}>{children}</body>
    </html>
  );
}
