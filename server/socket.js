const { Server } = require('socket.io');

function registerRoomHandlers(io, socket, messagesPerRoom) {
	socket.on('join_room', (roomName) => {
		if (typeof roomName !== 'string' || !roomName) return;

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
}

function registerChatHandlers(io, socket, messagesPerRoom) {
	socket.on('get_chat_history', (payload) => {
		const { sessionId } = payload ?? {};
		if (typeof sessionId !== 'string') return;

		const history = messagesPerRoom[sessionId] || [];

		socket.emit('history_messages', { sessionId, chatMessages: history });
	});

	// New scheme: receive a single message
	socket.on('new_message', (payload) => {
		const { sessionId, newMessage } = payload ?? {};
		if (typeof sessionId !== 'string' || typeof newMessage?.text !== 'string') return;

		if (!messagesPerRoom[sessionId]) {
			messagesPerRoom[sessionId] = [];
		}

		messagesPerRoom[sessionId].push(newMessage);

		// Send message to everyone in the room
		io.to(sessionId).emit('new_message', { newMessage });

		// Also notify all admins with the room id
		io.to('admins').emit('new_message', { sessionId, newMessage });
	});
}

function registerPresenceHandlers(io, socket) {
	socket.on('customer_away', (payload) => {
		const { sessionId } = payload ?? {};
		if (typeof sessionId !== 'string') return;

		io.to('admins').emit('customer_away', { sessionId });
	});

	socket.on('customer_back', (payload) => {
		const { sessionId } = payload ?? {};
		if (typeof sessionId !== 'string') return;

		io.to('admins').emit('customer_back', { sessionId });
	});

	socket.on('disconnect', () => {
		if (socket.sessionId) {
			console.log('🔌 Disconnected:', socket.sessionId);
			io.to('admins').emit('customer_disconnected', { sessionId: socket.sessionId });
		}
	});
}

module.exports = function (server) {
	// All messages per room
	const messagesPerRoom = {};

	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		registerRoomHandlers(io, socket, messagesPerRoom);
		registerChatHandlers(io, socket, messagesPerRoom);
		registerPresenceHandlers(io, socket);
	});
};
