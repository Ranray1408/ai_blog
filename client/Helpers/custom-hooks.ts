import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, BaseFetchData, IRootState } from '@/interfaces';
import { AsyncThunk } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { IMessage } from '@/interfaces';
import { setIsIncoming, setSessionId, setUserMessage, setUserMessages } from '@/store/userChatSlice';
import { userSocket } from './userSocketInstance';


interface IFetchDataParams<T extends BaseFetchData> {
	reducer: keyof IRootState;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchAction: AsyncThunk<T, void, any>;
}

export const useFetchData = <T extends BaseFetchData>({ reducer, fetchAction }: IFetchDataParams<T>) => {
	const dispatch = useDispatch<AppDispatch>();
	const data = useSelector((state: IRootState) => state[reducer]) as unknown as T;

	useEffect(() => {
		if (data.status === 'idle') {
			dispatch(fetchAction());
		}
	}, [dispatch, data.status, fetchAction]);

	return data;
};

// ------------------
// useUserChatSocket
// ------------------

export const useBaseChatSocket = ({ socket }: { socket: Socket }) => {
	useEffect(() => {
		if (!socket.connected) {
			socket.connect();
		}

		socket.on('connect', () => {
			console.log('✅ Connected');
		});

		return () => {
			socket.disconnect();
			console.log('🛑 Disconnected');
		};
	}, [socket]);

	return { socket };
};

// ------------------
// useUserChatSocket
// ------------------

// interface INewMessageData {
// 	sessionId: string, messagesArray: IMessage[]
// }

export const useUserChatSocket = () => {
	const dispatch = useDispatch();
	const chatSessionId = useSelector((state: IRootState) => state.userChatState.sessionId);
	const chat = useSelector((state: IRootState) => state.userChatState);

	// 🔌 Base socket hook (ping, reconnect, etc.)
	useBaseChatSocket({ socket: userSocket });

	// 📡 Tab visibility control (away/back)
	useEffect(() => {
		if (!chatSessionId) return;

		const handleVisibilityChange = () => {
			const eventName = document.hidden ? 'customer_away' : 'customer_back';
			userSocket.emit(eventName, { sessionId: chatSessionId });
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [chatSessionId]);

	// 🔌 Socket connection and join/chat history
	useEffect(() => {
		if (!chatSessionId) return;

		if (userSocket.connected) {
			userSocket.disconnect();
		}
		userSocket.connect();

		userSocket.emit('join_room', chatSessionId);
		userSocket.emit('get_chat_history', { sessionId: chatSessionId });

		return () => {
			userSocket.disconnect();
		};
	}, [chatSessionId]);

	// 📥 Chat history listener
	useEffect(() => {
		const handleHistory = ({ chatMessages }: { chatMessages: IMessage[] }) => {
			dispatch(setSessionId(chatSessionId!));
			dispatch(setUserMessages({ messages: chatMessages }));
		};

		userSocket.on('history_messages', handleHistory);

		return () => {
			userSocket.off('history_messages', handleHistory);
		};
	}, [chatSessionId, dispatch]);

	// 📥 New message listener
	useEffect(() => {
		const handleNewMessage = ({ newMessage }: { newMessage: IMessage }) => {
			dispatch(setUserMessage(newMessage));

			// 📌 Check if it's an incoming message
			const isIncoming = newMessage.senderId !== chat.currentUserId;

			if (isIncoming && !chat.isOpen) {
				dispatch(setIsIncoming(true));
			}
		};

		userSocket.on('new_message', handleNewMessage);

		return () => {
			userSocket.off('new_message', handleNewMessage);
		};
	}, [dispatch, chat.currentUserId, chat.isOpen]);

	// ✉️ Send message
	const onSendMessage = (text: string) => {
		if (!chatSessionId) return;

		const newMessage: IMessage = {
			id: Date.now().toString(),
			text,
			senderId: chatSessionId,
			timestamp: new Date().toISOString(),
		};

		userSocket.emit('new_message', { chatSessionId, newMessage });
	};

	return { onSendMessage };
};

