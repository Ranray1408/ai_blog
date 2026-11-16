import Footer from "@/components/Footer/Footer";
import { inter, KumbhSans } from "./fonts";
import Header from "@/components/Header/Header";
import { LayoutWrapperProps, IRootState } from "@/interfaces";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
import ChatPopup from "@/components/ChatPopup/ChatPopup";

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

	return (
		<html lang="en">
			<body className={`${inter.className} ${KumbhSans.className}`}>
				<Header />
				{children}
				<Footer />

				<ChatPopup />
			</body>
		</html>
	);
};

export default LayoutWrapper;
