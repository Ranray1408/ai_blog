import { configureStore } from '@reduxjs/toolkit';
import adminChatsReducer from './adminChatsSlice';
import adminActiveCustomersReducer from './adminActiveCustomersSlice';

// Admin-only store: the 2 admin slices from client/store/store.js
const store = configureStore({
  reducer: {
    adminChatsState: adminChatsReducer,
    adminActiveCustomersState: adminActiveCustomersReducer,
  },
});

export default store;
