import React, { FC, memo, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IChatWidgetProps } from '@/interfaces';
import { YellowBtn } from '../UI/Buttons';

const ChatWidgetWrapper = styled.div`
	width: 300px;
	height: 400px;
	border: 1px solid ${props => props.theme.colors.dark};
	border-radius: 8px;
	padding: 10px;
	background-color: ${props => props.theme.colors.dark};
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.messages-box {
		overflow-y: auto;
		margin-bottom: 10px;
		display: flex;
		flex-direction: column;
	}

	.message-item-box {
		margin-bottom: 8px;
		padding: 6px 10px;
		color: ${props => props.theme.colors.white};
		border-radius: 6px;

		&.other-message {
			background-color: ${props => props.theme.colors.yellow};
			color: ${props => props.theme.colors.dark};
			margin-right: auto;
		}

		&.my-message {
			background-color: ${props => props.theme.colors.dark3};
			margin-left: auto;
		}
	}

	.input-box {
		display: flex;
		gap: 8px;
	}

	.input {
		padding: 8px;
		border-radius: 6px;
		border: '1px solid #ccc';
	}

	.submit-button {
		padding: 8px 12px;
		border-radius: 6px;
		cursor: 'pointer';
	}

	.chat-controller {
		display: flex;
		justify-content: flex-end;
		gap: 20px;
	}

	.chat-controller-btn {
		width: 20px;
		height: 20px;
		cursor: pointer;
		background-color: ${prosp => prosp.theme.colors.dark};
	}
`;

interface IMessageInputProps {
	sessionId: string;
	onSendMessage: (text: string, sessionId: string) => void;
}

const MessageInput: FC<IMessageInputProps> = memo(({ sessionId, onSendMessage }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSend = () => {
		if (!inputValue.trim()) return;
		onSendMessage(inputValue.trim(), sessionId);
		setInputValue('');
	};

	const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className='input-box'>
			<input
				className='input'
				type='text'
				placeholder='Write message...'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleKeyDownEnter}
			/>
			<YellowBtn text='Send' onClick={handleSend}/>
		</div>
	);
});
MessageInput.displayName = 'MessageInput';

export const ChatWidget: FC<IChatWidgetProps> =
	(
		{ 	chatEntity,
			onSendMessage = () => { },
			removeChat = () => { },
			currentUserId
		}
	) => {
		const messagesEndRef = useRef<HTMLDivElement | null>(null);


		useEffect(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		}, [chatEntity]);

		return (
			<ChatWidgetWrapper>
				<div className='chat-controller'>
					<button
						onClick={() => removeChat(chatEntity.sessionId)}
						className='chat-controller-btn'>X</button>
				</div>

				<div className='messages-box'>
					{chatEntity.messages && chatEntity.messages.length > 0 &&
						chatEntity.messages.map(message => {
						if (!message?.id || !message?.text) return '';

						const myMessageClass = message.senderId === currentUserId ? 'my-message' : 'other-message';

						return (
							<div key={message.id} className={`message-item-box ${myMessageClass}`}>
								{message.text}
							</div>
						)
					})}
					<div ref={messagesEndRef} />
				</div>

				<MessageInput sessionId={chatEntity.sessionId} onSendMessage={onSendMessage} />
			</ChatWidgetWrapper>
		);
	};

export default ChatWidget;
