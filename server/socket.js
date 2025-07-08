const { Server } = require('socket.io');

module.exports = function (server) {
	// All messages per room
	const messagesPerRoom = {};

	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {

		socket.on('join_room', (roomName) => {
			console.log('➡️ join_room:', roomName);

			socket.join(roomName);

			// Initialize array if not exists
			if (!messagesPerRoom[roomName]) {
				messagesPerRoom[roomName] = [];
			}

			// If it's not the admins room, store sessionId
			if (roomName !== 'admins') {
				socket.sessionId = roomName;

				// Notify all admins about new online customer
				io.to('admins').emit('new_customer_online', { sessionId: roomName });

				// Send full chat history to the customer
				socket.emit('history_messages', { messages: messagesPerRoom[roomName] });
			}

			// If it's an admin, send list of active customers
			if (roomName === 'admins') {
				const activeRooms = [];
				io.sockets.adapter.rooms.forEach((sockets, name) => {
					console.log('sockets.adapter.rooms', name);

					if (
						name !== 'admins' &&
						!io.sockets.sockets.get(name) && // Not a socket id
						sockets.size > 0
					) {
						activeRooms.push(name);
					}
				});

				socket.emit('active_customers', { rooms: activeRooms });
			}
		});

		socket.on('get_chat_history', ({ sessionId }) => {
			const history = messagesPerRoom[sessionId] || [];

			socket.emit('history_messages', { sessionId, chatMessages: history });
		});

		socket.on('customer_away', ({ sessionId }) => {
			io.to('admins').emit('customer_away', { sessionId });
		});

		socket.on('customer_back', ({ sessionId }) => {
			io.to('admins').emit('customer_back', { sessionId });
		});

		// New scheme: receive a single message
		socket.on('new_message', ({ sessionId, newMessage }) => {
			if (!messagesPerRoom[sessionId]) {
				messagesPerRoom[sessionId] = [];
			}

			messagesPerRoom[sessionId].push(newMessage);

			// Send message to everyone in the room
			io.to(sessionId).emit('new_message', { newMessage });

			// Also notify all admins with the room id
			io.to('admins').emit('new_message', { sessionId, newMessage });
		});

		socket.on('disconnect', () => {
			if (socket.sessionId) {
				console.log('🔌 Disconnected:', socket.sessionId);
				io.to('admins').emit('customer_disconnected', { sessionId: socket.sessionId });
			}
		});
	});
};
