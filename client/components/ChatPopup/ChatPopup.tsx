import Cookies from 'js-cookie';
import styled from '@emotion/styled';
import ChatWidget from '../ChatWinget/ChatWinget';
import { useUserChatSocket } from '@/Helpers/custom-hooks';
import { IMessage, IRootState } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { userSocket } from '@/Helpers/userSocketInstance';
import { removeUserChat, setSessionId } from '@/store/userChatSlice';
import { useEffect, useState } from 'react';

const ChatWrapper = styled.div`
    position: fixed;
    left: 20px;
    z-index: 10000;
    bottom: 20px;
`;


const ensureSessionId = (sessionId: string | undefined) => {

  if (!sessionId) {
    const staticSessionId = '1e66f79d-eec6-4be6-8800-2ef95790f804';
    Cookies.set('session_id', staticSessionId, {
      expires: 1,
      sameSite: 'lax',
    });
  }
};

const ChatPopup = () => {
  const dispatch = useDispatch();

  useUserChatSocket();

  const [sessionId, setSessionIdLocal] = useState<string | undefined>(undefined);
  const chat = useSelector((state: IRootState) => state.userChatState);
  console.log('chat', chat);

  useEffect(() => {
    const cookieSession = Cookies.get('session_id');
    if (cookieSession) {
      dispatch(setSessionId(cookieSession));
      setSessionIdLocal(cookieSession);
    }
  }, [dispatch]);

  const onSendMessage = (text: string) => {
    if (!sessionId) return;

    const newMessage: IMessage = {
      id: Date.now().toString(),
      text,
      senderId: sessionId,
      timestamp: new Date().toISOString(),
    };

    userSocket.emit('new_message', { sessionId, newMessage });
  };

  const removeChat = () => {
    dispatch(removeUserChat())
  }

  //Temp code
  ensureSessionId(sessionId);

  return chat.messages?.length && sessionId &&
    <ChatWrapper className='user-chat'>
      <ChatWidget currentUserId={sessionId} removeChat={removeChat} onSendMessage={onSendMessage} chatEntity={chat} />
    </ChatWrapper>;
};

export default ChatPopup;
