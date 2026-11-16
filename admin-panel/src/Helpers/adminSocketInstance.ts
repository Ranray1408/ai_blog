import { io } from 'socket.io-client';
import API_ENDPOINTS from '@/config/APIs';

export const adminSocket = io(API_ENDPOINTS.SERVER_PATH, {
  autoConnect: false,
});
