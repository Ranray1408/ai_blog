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
					messages: chatMessages
				});
			}
		},

		removeAdminChat: (state, action) => {
			state.chats = state.chats.filter(chat => chat.sessionId !== action.payload);
		},

		addMessageToAdminChat: (state, action) => {
			const { sessionId, newMessage } = action.payload;
			const chat = state.chats.find(chat => chat.sessionId === sessionId);
			if (chat) {
				const exists = chat.messages.find(msg => msg.id === newMessage.id);
				if (!exists) {
					chat.messages.push(newMessage);
				}
			}
		}
	}
});

export const {
	addAdminChat,
	toggleAdminChat,
	removeAdminChat,
	addMessageToAdminChat
} = adminChatsSlice.actions;


export default adminChatsSlice.reducer;
