import Cookies from 'js-cookie';
import styled from '@emotion/styled';
import ChatWidget from '../ChatWinget/ChatWinget';
import { useUserChatSocket } from '@/Helpers/custom-hooks';
import { IMessage, IRootState } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { userSocket } from '@/Helpers/userSocketInstance';
import { closeUserChat, openUserChat, setSessionId } from '@/store/userChatSlice';
import { useEffect } from 'react';
import { SVG_COMPONENTS } from '@/Helpers/single-func';

const ChatWrapper = styled.div`
    position: fixed;
    left: 20px;
    z-index: 10000;
    bottom: 20px;

    .user-chat-button {
      z-index: 10000;
      position: fixed;
      padding: 0;
      bottom: 6px;
      left: 80px;
      border-radius: 50%;
      border: none;
      background-color: transparent;

      svg {
        transition: transform 0.3s;
      }

      &:hover svg{
        transform: scale(1.3, 1.3);
      }

      &.is-incoming {
        &::after {
          content: '';
          display: block;
          width: 20px;
          height: 20px;
          background-color: red;
          position: absolute;
          top: -5px;
          right: -5px;
          border-radius: 50%;
        }
      }
    }
`;


// const ensureSessionId = () => {
//     const staticSessionId = '2e12c612-f998-4507-a087-5f9fdfbbad9f';
//     Cookies.set('session_id', staticSessionId, {
//       expires: 1,
//       sameSite: 'lax',
//     });
// };

const ChatPopup = () => {
  const dispatch = useDispatch();

  useUserChatSocket();

  const chat = useSelector((state: IRootState) => state.userChatState);
  useSelector((state: IRootState) => state.userChatState.messages);
  console.log('chat', chat);

  // useEffect(() => {
  //   dispatch(setSessionId('2e12c612-f998-4507-a087-5f9fdfbbad9f'));
  // }, []);

  useEffect(() => {
    if (chat.sessionId) {
      Cookies.set('session_id', chat.sessionId, {
        expires: 1,
        sameSite: 'lax',
      });
    }
  }, [chat.sessionId])

  useEffect(() => {
    const cookieSession = Cookies.get('session_id');
    if (cookieSession) {
      dispatch(setSessionId(cookieSession));
    }
  }, [dispatch]);

  const onSendMessage = (text: string) => {
    if (!chat.sessionId) return;

    const newMessage: IMessage = {
      id: Date.now().toString(),
      text,
      senderId: chat.sessionId,
      timestamp: new Date().toISOString(),
    };

    userSocket.emit('new_message', { sessionId: chat.sessionId, newMessage });
  };

  const closeChat = () => {
    dispatch(closeUserChat())
  }

  const openChat = () => {
    dispatch(openUserChat())
  }

  if (chat.isOpen) {
    return chat.messages?.length && chat.sessionId &&
      <ChatWrapper className='user-chat'>
        <ChatWidget currentUserId={chat.sessionId} closeChat={closeChat} onSendMessage={onSendMessage} chatEntity={chat} />
      </ChatWrapper>;

  } else {
    const ChatIcon = SVG_COMPONENTS['ChatIcon'];
    return chat.messages?.length && chat.sessionId &&
      <ChatWrapper className='user-chat'>
        <button
          onClick={() => openChat()}
          className={`user-chat-button ${chat.isIncoming ? 'is-incoming' : ''}`}>
          <ChatIcon />
        </button>
      </ChatWrapper >;
  }
};

export default ChatPopup;
