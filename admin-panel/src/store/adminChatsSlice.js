import { createSlice } from '@reduxjs/toolkit';


const initialState = {
	chats: []
};

export const adminChatsSlice = createSlice({
	name: 'adminChats',
	initialState,
	reducers: {
		addAdminChat: (state, action) => {
			const { sessionId, chatMessages = [] } = action.payload;
			const exists = state.chats.find(chat => chat.sessionId === sessionId);
			if (!exists) {
				state.chats.push({
					sessionId,
					messages: chatMessages,
					isIncoming: false,
					isOpen: true
				});
			}
		},
		closeAdminChat: (state, action) => {
			const chat = state.chats.find(chat => chat.sessionId === action.payload);
			if (chat) {
				chat.isOpen = false;
			}
		},
		openAdminChat: (state, action) => {
			const chat = state.chats.find(chat => chat.sessionId === action.payload);
			if (chat) {
				chat.isOpen = true;
				chat.isIncoming = false;
			}
		},
		removeAdminChat: (state, action) => {
			state.chats = state.chats.filter(chat => chat.sessionId !== action.payload);
		},

		addMessageToAdminChat: (state, action) => {
			const { sessionId, newMessage, isIncoming } = action.payload;
			const chat = state.chats.find(chat => chat.sessionId === sessionId);
			if (chat) {
				const exists = chat.messages.find(msg => msg.id === newMessage.id);
				if (!exists) {
					chat.messages.push(newMessage);

					if (isIncoming) {
						chat.hasNewMessage = true;
					}
				}
			}
		},
		markChatAsRead: (state, action) => {
			const chat = state.chats.find(chat => chat.sessionId === action.payload);
			if (chat) {
				chat.isIncoming = false;
			}
		},
		markChatIsIncoming: (state, action) => {
			const chat = state.chats.find(chat => chat.sessionId === action.payload);
			if (chat && !chat.isOpen) {
				chat.isIncoming = true;
			}
		},
	}
});

export const {
	addAdminChat,
	toggleAdminChat,
	closeAdminChat,
	openAdminChat,
	markChatAsRead,
	markChatIsIncoming,
	removeAdminChat,
	addMessageToAdminChat
} = adminChatsSlice.actions;


export default adminChatsSlice.reducer;
