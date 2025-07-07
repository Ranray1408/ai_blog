const { Server } = require('socket.io');

module.exports = function (server) {
	// Усі повідомлення по кімнатах
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

			// Ініціалізуємо масив якщо його нема
			if (!messagesPerRoom[roomName]) {
				messagesPerRoom[roomName] = [];
			}

			// Якщо це не кімната адмінів, зберігаємо sessionId
			if (roomName !== 'admins') {
				socket.sessionId = roomName;

				// Кажемо всім адмінам що зʼявився новий клієнт
				io.to('admins').emit('new_customer_online', { sessionId: roomName });

				// Віддаємо користувачу всю історію
				socket.emit('history_messages', { messages: messagesPerRoom[roomName] });
			}

			// Якщо це адмін — даємо список активних клієнтів
			if (roomName === 'admins') {
				const activeRooms = [];
				io.sockets.adapter.rooms.forEach((sockets, name) => {
					console.log('sockets.adapter.rooms', name);

					if (
						name !== 'admins' &&
						!io.sockets.sockets.get(name) && // Не сокет id
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
			console.log('history', history);

			socket.emit('history_messages', { sessionId, chatMessages: history });
		});

		// Нова схема: отримуємо одне повідомлення
		socket.on('new_message', ({ sessionId, newMessage }) => {
			if (!messagesPerRoom[sessionId]) {
				messagesPerRoom[sessionId] = [];
			}

			messagesPerRoom[sessionId].push(newMessage);

			// Відправляємо повідомлення всім у кімнаті
			io.to(sessionId).emit('new_message', { newMessage });

			// Також повідомляємо всіх адмінів з ідентифікатором кімнати
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
