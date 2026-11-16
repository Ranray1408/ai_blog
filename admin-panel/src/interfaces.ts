import type { ButtonHTMLAttributes, ReactNode } from 'react';

// Copied from client/interfaces.ts: only the types the admin uses

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	text?: string;
	isHyperlink?: boolean;
	hrefLink?: string;
	type?: "button" | "submit" | "reset";
	icon?: ReactNode | null;
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
	hasNewMessage: boolean;
	messages: IMessage[];
	currentUserId: null | string,
	isIncoming: boolean,
}

export interface IAdminChatsState {
	chats: IChatEntity[];
}

export interface IAdminActiveCustomersState {
	list: string[];
	viewed: string[];
}

export interface IChatWidgetProps {
	chatEntity: IChatEntity;
	currentUserId: string;
	onSendMessage: (text: string, sessionId: string) => void;
	closeChat: (sessionId: string) => void;
}

// Admin store only (see store/store.js)
export interface IRootState {
	adminChatsState: IAdminChatsState;
	adminActiveCustomersState: IAdminActiveCustomersState;
}
