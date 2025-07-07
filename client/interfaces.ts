import { ReactNode } from "react";
import store from "./store/store";

// General interfaces *****************
export interface ISvgIcons {
	additionalClass?: string;
};

export interface IContainer {
	className?: string;
	children: React.ReactNode;
};

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	text?: string;
	isHyperlink?: boolean;
	hrefLink?: string;
	type?: "button" | "submit" | "reset";
	icon?: React.ReactNode | null;
}

export interface ITypography {
	type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	children: React.ReactNode;
	className?: string;
}

export interface LayoutWrapperProps {
	children: ReactNode;
}

export type AppDispatch = typeof store.dispatch;
// General interfaces END *****************

// Fetch interfaces
export interface BaseFetchData {
	status: string;
	error: string | null;
}
// Fetch interfaces END



// IHeaderData ************
export interface IHeaderData extends BaseFetchData {
	headerText: string;
	navigation: { label: string, href: string }[];
	contactButtonText: string;
}

// Footer data ***************
interface IMenuItem {
	itemName: string;
	itemUrl: string;
	isNew: boolean;
}

interface IFooterMenu {
	menuName: string;
	menuItems: IMenuItem[];
}

interface IPolicyItem {
	itemName: string;
	itemUrl: string;
}

interface ISocialItem {
	socialId: number;
	socialIcon: string;
	socialUrl: string;
}

interface IFooterBottomInfo {
	policy: IPolicyItem[];
	socials: ISocialItem[];
	ps: string;
}

export interface IFooterDataAPI extends BaseFetchData {
	footerMenus: IFooterMenu[];
	footerBottomInfo: IFooterBottomInfo;
}


// Blocks data interfaces
// IHeroBannerData **********
export interface IHeroBannerData extends BaseFetchData {
	statistics: { title: string, value: number }[],
	uptitle: string;
	title: string;
	buttonText: string;
	suptitle: string;
	infoTitle: string;
	infotText: string;
}

// ILinkBlocksData ***********
interface ILinkBlock {
	svg: string;
	title: string;
	suptitle: string;
	text: string;
	url: string;
}

export interface ILinkBlocksData extends BaseFetchData {
	linkBlocks: ILinkBlock[],
}

// ITitleBlock ************
interface ITitleBlock {
	uptitle: string;
	title: string;
	linkText: string;
	linkHref: string;
}

// ITitleBlocksData
interface ITitleBlocksData {
	titleBlock1: ITitleBlock;
	titleBlock2: ITitleBlock;
	titleBlock3: ITitleBlock;
	titleBlock4: ITitleBlock;
}

export interface ITitleBlockProps {
	blockDataName: keyof ITitleBlocksData | null;
}

export interface IJSONTitleBlocksData extends BaseFetchData {
	blocksData: ITitleBlocksData | null;
}

// IBlockInfoBlock **********

export interface IBlogInfoData {
	title: string;
	description: string,
	svg: string,
	columns: { columnTitle: string, columnText: string }[],
}

export interface IBlockInfoBlockAPI extends BaseFetchData {
	blogInfoBlocksData: {
		blogInfoData1: IBlogInfoData,
		blogInfoData2: IBlogInfoData,
	},
}

export interface BlogInfoBlockParams {
	blockDataName: keyof IBlockInfoBlockAPI['blogInfoBlocksData'] | null
}

// DownloadBlock *********************
export interface IDownloadBlock {
	svg: string;
	title: string;
	imageUrl: string;
	text: string;
	buttonText1: string;
	buttonText2: string;
	blockStatistic: {
		text: string;
		downloadUsersCount: number;
		text2: string;
	};
	rightTitle: string;
	rightDescription: string;
	innersBlocks: {
		innerTitle: string;
		innerText: string;
	}[];
}

export interface IDownloadBlocksAPI extends BaseFetchData {
	downloadBlock1: IDownloadBlock;
	downloadBlock2: IDownloadBlock;
}

export interface IDownloadBlockParams {
	blockDataName: keyof IDownloadBlocksAPI | null;
}

// TitleLinksBlock ******************
export interface ITitleLinksBlockAPI extends BaseFetchData {
	links: { title: string, text: string, url: string }[];
	grayText: string;
	title: string;
	text: string;
}

// Blocks data interfaces END

export interface IRootState {
	mainStates: MainStates;
	membersList: IMember[];
	headerState: IHeaderData;
	heroBannerState: IHeroBannerData;
	linkBlocksState: ILinkBlocksData;
	titleBlocksState: IJSONTitleBlocksData;
	blogInfoBlockState: IBlockInfoBlockAPI;
	downloadBlocksState: IDownloadBlocksAPI;
	titleLinksBlockState: ITitleLinksBlockAPI;
	footerState: IFooterDataAPI;
	contactsPageState: IContactsPageDataAPI;
	userChatState: IChatEntity;
	adminChatsState: IAdminChatsState;
}


export interface MainStates {
	isPopupOpened: boolean;
}


// Members interfaces *********************
export interface IMember {
	id: number,
	fullName: string,
	position: string,
	photo: string | ReactNode,
	title: string,
	shortDescription: string,
	likesCount: number,
	commentsCount: number,
	messagesCount: number,
	rate: number,
}

export interface IMembersDataAPI extends BaseFetchData {
	members: IMember[];
}

export interface IFilteMemberItem {
	member: IMember
}

export interface PaginationProps {
	members: IMember[];
}

// Contacts page ***********************

export interface IContactsPageDataAPI extends BaseFetchData {
	svgIcons: string;
	title: string;
	inputs: [];
}

export interface IFormFieldsName {
	first_name: string,
	last_name: string,
	email: string,
	phone: string,
	message: string,
	privacy_acceptence: string,
}


export interface IMessage {
	text: string;
	id: string;
	senderId: string;
	timestamp: string;
}

export interface IChatEntity {
	sessionId: string;
	isOpen?: boolean;
	messages: IMessage[];
	currentUserId: null | string,
}

export interface IAdminChatsState {
	chats: IChatEntity[];
}


export interface IChatWidgetProps {
	chatEntity: IChatEntity;
	currentUserId: string;
	onSendMessage: (text: string, sessionId: string) => void;
	removeChat: (sessionId: string) => void;
}
