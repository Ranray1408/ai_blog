import React from 'react';
import styled from '@emotion/styled';
import ChatWidget from '../ChatWinget/ChatWinget';
import { IMessage, IRootState } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminChatSocket } from '@/Helpers/custom-hooks';
import { adminSocket } from '@/Helpers/adminSocketInstance';
import { addMessageToAdminChat, closeAdminChat } from '@/store/adminChatsSlice';

const AdminChatsWrapper = styled.div`
    position: fixed;
	bottom: 20px;
    left: 20px;
    z-index: 10000;
	display: grid;
	gap: 30px;
	grid-template-columns: 1fr 1fr 1fr;

`;


const AdminChats = () => {
	const dispatch = useDispatch()

	useAdminChatSocket();

	const { chats } = useSelector((state: IRootState) => state.adminChatsState);
	console.log('chats', chats);

	const onSendMessage = (text: string, sessionId: string) => {
		const newMessage: IMessage = {
			id: Date.now().toString(),
			text,
			senderId: 'admin',
			timestamp: new Date().toISOString(),
		};


		dispatch(addMessageToAdminChat({ sessionId, newMessage }));

		adminSocket.emit('new_message', { sessionId, newMessage });
	};

	const closeChat = (sessionId: string) => {
		dispatch(closeAdminChat(sessionId));
	}

	return (
		<>
			{
				chats &&
				<AdminChatsWrapper>
					{chats.map((chat) => {
						if (!chat.isOpen) return null;

						return (
							<ChatWidget
								closeChat={closeChat}
								onSendMessage={onSendMessage}
								key={chat.sessionId}
								chatEntity={chat}
								currentUserId={'admin'}
							/>)
					}
					)
					}
				</AdminChatsWrapper>
			}
		</>
	);
};

export default AdminChats;
