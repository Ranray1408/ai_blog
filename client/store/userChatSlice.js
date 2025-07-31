// store/userChatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  messages: [],
  isOpen: false,
  currentUserId: null,
  isIncoming: false,
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
       state.messages.push(action.payload);
    },
    closeUserChat: (state) => {
      state.isOpen = false;
    },
    openUserChat: (state) => {
      state.isOpen = true;
      state.isIncoming = false;
    },
    setIsIncoming: (state, action) => {
      state.isIncoming = action.payload;
    },
  },
});

export const {
  closeUserChat,
  openUserChat,
  setSessionId,
  setUserMessage,
  setUserMessages,
  setIsIncoming,
} = userChatSlice.actions;

export default userChatSlice.reducer;
