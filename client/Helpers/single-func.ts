import CircleQuarter from "@/images/svg-icons/CircleQuarter";
import DividedTarget from "@/images/svg-icons/DividedTarget";
import DualHalves from "@/images/svg-icons/DualHalves";
import MandalaSymbol from "@/images/svg-icons/MandalaSymbol";
import MessageIcon from "@/images/svg-icons/MessageIcon";
import TriangleFlag from "@/images/svg-icons/TriangleFlag";
import DualPanelIcon from "@/images/svg-icons/DualPanelIcon";
import Twitter from "@/images/svg-icons/Twitter";
import Spotify from "@/images/svg-icons/Spotify ";
import Linkedin from "@/images/svg-icons/Linkedin";
import FourCircle from "@/images/svg-icons/FourCircle";

export const formatNumber = (number: number) => {
	if (number >= 1000) {
		const formattedNumber = (number / 1000).toFixed(1) + 'к';
		return formattedNumber;
	} else {
		return number;
	}
}

export const SVG_COMPONENTS: { [key: string]: React.ComponentType } = {
	CircleQuarter,
	DividedTarget,
	DualHalves,
	MandalaSymbol,
	MessageIcon,
	TriangleFlag,
	DualPanelIcon,
	Twitter,
	Spotify,
	Linkedin,
	FourCircle,
};
