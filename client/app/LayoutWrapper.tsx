import Footer from "@/components/Footer/Footer";
import { inter, KumbhSans } from "./fonts";
import Header from "@/components/Header/Header";
import { LayoutWrapperProps, IRootState } from "@/interfaces";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import ChatPopup from "@/components/ChatPopup/ChatPopup";
import { usePathname } from "next/navigation";
import AdminChats from "@/components/AdminChats/AdminChats";

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
	const isPopupOpened = useSelector((state: IRootState) => state.mainStates.isPopupOpened);

	useEffect(() => {
		if (isPopupOpened) {
			document.body.classList.add('disable-scroll');
		} else {
			document.body.classList.remove('disable-scroll');
		}

		return () => document.body.classList.remove('disable-scroll');
	}, [isPopupOpened]);

	const isAdminPanel = usePathname() === '/admin';

	return (
		<html lang="en">
			<body className={`${inter.className} ${KumbhSans.className}`}>
				<Header />
				{children}
				<Footer />

				{
					!isAdminPanel
						? <ChatPopup />
						: <AdminChats />
				}
			</body>
		</html>
	);
};

export default LayoutWrapper;
