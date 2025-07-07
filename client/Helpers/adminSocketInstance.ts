import { io } from 'socket.io-client';

export const adminSocket = io('http://localhost:5000', {
  autoConnect: false,
});
