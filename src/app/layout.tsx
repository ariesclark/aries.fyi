import "~/styles/globals.css";

import { Work_Sans } from "@next/font/google";
import { twMerge } from "tailwind-merge";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-worksans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head />
			<body className={twMerge("h-screen w-screen bg-black-900 text-white", workSans.variable)}>
				{children}
			</body>
		</html>
	);
}
