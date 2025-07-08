// store/userChatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  messages: [],
  isOpen: false,
  currentUserId: null,
};

export const userChatSlice = createSlice({
  name: 'userChat',
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      state.currentUserId = action.payload;
      state.isOpen = true;
    },
    setUserMessages: (state, action) => {
      state.messages = action.payload.messages;
    },
    setUserMessage: (state, action) => {
       state.messages.push(action.payload.newMessage);
    },
    removeUserChat: (state) => {
      state.sessionId = null;
      state.messages = [];
      state.isOpen = false;
    },
  },
});

export const {
  removeUserChat,
  setSessionId,
  setUserMessage,
  setUserMessages,
  clearUserChat,
} = userChatSlice.actions;

export default userChatSlice.reducer;
