import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, BaseFetchData, IRootState } from '@/interfaces';
import { AsyncThunk } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { IMessage } from '@/interfaces';
import { setSessionId, setUserMessages } from '@/store/userChatSlice';
import { addAdminChat, addMessageToAdminChat } from '@/store/adminChatsSlice';
import { addOnlineCustomer, removeOnlineCustomer, updateOnlineCustomers } from '@/store/adminActiveCustomersSlice';
import { userSocket } from './userSocketInstance';
import { adminSocket } from './adminSocketInstance';


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
	const sessionId = Cookies.get('session_id');

	useBaseChatSocket({ socket: userSocket });

	useEffect(() => {
		if (!sessionId) {
			console.warn('⚠️ No session ID!');
			return;
		}

		userSocket.emit('join_room', sessionId);

		userSocket.on('history_messages', ({ chatMessages }) => {
			console.log('history_messages', chatMessages);
			dispatch(setSessionId(sessionId));
			dispatch(setUserMessages({ messages: chatMessages }))
		});

		userSocket.on('new_message', ({ newMessage }: { newMessage: IMessage }) => {
			console.log('new_message', newMessage);
			userSocket.emit('get_chat_history', { sessionId: sessionId });

			//dispatch(setUserMessage(newMessage))
		});

		return () => {
			userSocket.off('new_message');
			userSocket.off('history_messages');
		};
	}, [sessionId, dispatch]);

	const onSendMessage = (text: string) => {
		if (!sessionId) return;

		const newMessage = {
			id: Date.now().toString(),
			text,
			senderId: sessionId,
			timestamp: new Date().toISOString(),
		};

		userSocket.emit('new_message', { sessionId, newMessage });
	};

	return { onSendMessage };
};

// ------------------
// useAdminChatSocket
// ------------------

export const useAdminChatSocket = () => {
	const dispatch = useDispatch();

	useBaseChatSocket({ socket: adminSocket });

	useEffect(() => {
		adminSocket.emit('join_room', 'admins');

		adminSocket.on('new_message', ({ sessionId, newMessage }: { sessionId: string, newMessage: IMessage }) => {
			adminSocket.emit('get_chat_history', { sessionId });
			dispatch(addMessageToAdminChat({ sessionId, newMessage }));
		});

		adminSocket.on('active_customers', ({ rooms }: { rooms: string[] }) => {
			dispatch(updateOnlineCustomers(rooms));
		});

		adminSocket.on('history_messages', ({ sessionId, chatMessages }) => {
			dispatch(addAdminChat({ sessionId, chatMessages }));
		});

		adminSocket.on('new_customer_online', ({ sessionId }: { sessionId: string }) => {
			dispatch(addOnlineCustomer(sessionId));
		});

		adminSocket.on('customer_disconnected', ({ sessionId }: { sessionId: string }) => {
			dispatch(removeOnlineCustomer(sessionId));
		});

		return () => {
			adminSocket.off('new_message');
			adminSocket.off('active_customers');
			adminSocket.off('new_customer_online');
			adminSocket.off('customer_disconnected');
		};
	}, [dispatch]);

	const onSendMessage = (text: string, sessionId: string) => {
		const newMessage = {
			id: Date.now().toString(),
			text,
			senderId: 'admin',
			timestamp: new Date().toISOString(),
		};

		adminSocket.emit('new_message', { sessionId, newMessage });
	};

	return { onSendMessage };
};
