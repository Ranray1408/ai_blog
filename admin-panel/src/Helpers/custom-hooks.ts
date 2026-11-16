import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { IMessage } from '@/interfaces';
import { addAdminChat, addMessageToAdminChat, markChatIsIncoming } from '@/store/adminChatsSlice';
import { addOnlineCustomer, markCustomerAsAway, markCustomerAsBack, removeOnlineCustomer, updateOnlineCustomers } from '@/store/adminActiveCustomersSlice';
import { adminSocket } from './adminSocketInstance';

// Admin part of client/Helpers/custom-hooks.ts, unchanged logic

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
// useAdminChatSocket
// ------------------

export const useAdminChatSocket = () => {
	const dispatch = useDispatch();

	// Socket connection and base logic
	useBaseChatSocket({ socket: adminSocket });

	// Join admin room
	useEffect(() => {
		adminSocket.emit('join_room', 'admins');
	}, []);

	// Handle new incoming messages
	useEffect(() => {
		const handleNewMessage = ({ sessionId, newMessage }: { sessionId: string; newMessage: IMessage }) => {
			dispatch(addMessageToAdminChat({ sessionId, newMessage }));

			if (newMessage.senderId !== 'admin') {
				dispatch(markChatIsIncoming(sessionId));
			}
		};

		adminSocket.on('new_message', handleNewMessage);
		return () => {
			adminSocket.off('new_message', handleNewMessage);
		};
	}, [dispatch]);

	// Update list of online customers
	useEffect(() => {
		const handleActiveCustomers = ({ rooms }: { rooms: string[] }) => {
			dispatch(updateOnlineCustomers(rooms));
		};

		adminSocket.on('active_customers', handleActiveCustomers);
		return () => {
			adminSocket.off('active_customers', handleActiveCustomers);
		};
	}, [dispatch]);

	// Handle chat history
	useEffect(() => {
		const handleHistoryMessages = ({ sessionId, chatMessages }: { sessionId: string; chatMessages: IMessage[] }) => {
			dispatch(addAdminChat({ sessionId, chatMessages }));
		};

		adminSocket.on('history_messages', handleHistoryMessages);
		return () => {
			adminSocket.off('history_messages', handleHistoryMessages);
		};
	}, [dispatch]);

	// Handle user status changes
	useEffect(() => {
		const handleNewCustomerOnline = ({ sessionId }: { sessionId: string }) => {
			dispatch(addOnlineCustomer(sessionId));
			dispatch(markCustomerAsBack(sessionId));
		};

		const handleCustomerDisconnected = ({ sessionId }: { sessionId: string }) => {
			dispatch(removeOnlineCustomer(sessionId));
		};

		const handleCustomerAway = ({ sessionId }: { sessionId: string }) => {
			dispatch(markCustomerAsAway(sessionId));
		};

		const handleCustomerBack = ({ sessionId }: { sessionId: string }) => {
			dispatch(markCustomerAsBack(sessionId));
		};

		adminSocket.on('new_customer_online', handleNewCustomerOnline);
		adminSocket.on('customer_disconnected', handleCustomerDisconnected);
		adminSocket.on('customer_away', handleCustomerAway);
		adminSocket.on('customer_back', handleCustomerBack);

		return () => {
			adminSocket.off('new_customer_online', handleNewCustomerOnline);
			adminSocket.off('customer_disconnected', handleCustomerDisconnected);
			adminSocket.off('customer_away', handleCustomerAway);
			adminSocket.off('customer_back', handleCustomerBack);
		};
	}, [dispatch]);

	// Send message function
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
