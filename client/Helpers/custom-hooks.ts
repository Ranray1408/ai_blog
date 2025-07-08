import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, BaseFetchData, IRootState } from '@/interfaces';
import { AsyncThunk } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { IMessage } from '@/interfaces';
import { setSessionId, setUserMessages } from '@/store/userChatSlice';
import { addAdminChat, addMessageToAdminChat } from '@/store/adminChatsSlice';
import { addOnlineCustomer, markCustomerAsAway, markCustomerAsBack, removeOnlineCustomer, updateOnlineCustomers } from '@/store/adminActiveCustomersSlice';
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
	const chatSessionId = useSelector((state: IRootState) => state.userChatState.sessionId);

	useBaseChatSocket({ socket: userSocket });

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (!chatSessionId) return;

			if (document.hidden) {
				userSocket.emit('customer_away', { sessionId: chatSessionId });
			} else {
				userSocket.emit('customer_back', { sessionId: chatSessionId });
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [chatSessionId]);

	useEffect(() => {
		if (!chatSessionId) {
			console.warn('⚠️ No session ID!');
			return;
		}

		if (userSocket.connected) {
			userSocket.disconnect();
		}

		userSocket.connect();

		userSocket.emit('join_room', chatSessionId);

		userSocket.on('history_messages', ({ chatMessages }) => {
			console.log('history_messages', chatMessages);
			dispatch(setSessionId(chatSessionId));
			dispatch(setUserMessages({ messages: chatMessages }))
		});

		userSocket.on('new_message', ({ newMessage }: { newMessage: IMessage }) => {
			console.log('new_message', newMessage);
			userSocket.emit('get_chat_history', { sessionId: chatSessionId });

			//dispatch(setUserMessage(newMessage))
		});

		return () => {
			userSocket.off('new_message');
			userSocket.off('history_messages');
		};
	}, [chatSessionId, dispatch]);

	const onSendMessage = (text: string) => {
		if (!chatSessionId) return;

		const newMessage = {
			id: Date.now().toString(),
			text,
			senderId: chatSessionId,
			timestamp: new Date().toISOString(),
		};

		userSocket.emit('new_message', { chatSessionId, newMessage });
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

		adminSocket.on('customer_away', ({ sessionId }) => {
			dispatch(markCustomerAsAway(sessionId));
		});

		adminSocket.on('customer_back', ({ sessionId }) => {
			dispatch(markCustomerAsBack(sessionId));
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
