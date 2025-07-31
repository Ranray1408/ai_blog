import { useListContext, List } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminChatSocket } from '@/Helpers/custom-hooks';
import { adminSocket } from '@/Helpers/adminSocketInstance';
import { YellowBtn } from '../UI/Buttons';
import styled from '@emotion/styled';
import { openAdminChat } from '@/store/adminChatsSlice';

const TableWrapper = styled.table`
  border-radius: 15px;
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: 'left';
    padding: 20px 8px;
    border-bottom: 1px solid #ccc;
    background-color: ${props => props.theme.colors.dark} !important;
  }

  td {
    text-align: center;
    padding: 20px 8px;
    border-bottom: 1px solid #eee;
    vertical-align: top;
  }

  .message-td {
    white-space: pre-wrap;
    word-break: break-word;
    max-width: 200px;
  }

  .chat-section {
    position: relative;
    width: 300px;

    span {
      margin: 0 20px;
    }
  }

   .is-incoming {
        position: relative;
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
`;

const CustomCustomerTable = () => {
  const { data, isLoading } = useListContext();
  const onlineCustomers = useSelector(state => state.adminActiveCustomersState.list);
  const dispatch = useDispatch();
  const adminChats = useSelector(state => state.adminChatsState.chats);
  const activeViewedCustomers = useSelector(state => state.adminActiveCustomersState.viewed);

  useAdminChatSocket();
  console.log('adminChats', adminChats);

  const handleAddChat = (sessionId) => {
    const chatExists = adminChats.find(chat => chat.sessionId === sessionId);

    if (chatExists) {
      dispatch(openAdminChat(sessionId));
      return;
    }

    adminSocket.emit('get_chat_history', { sessionId });
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No customers found.</p>;

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th>Action</th>
          <th>ID</th>
          <th>Session id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => {
          const sessionId = record.session_id;

          const chat = adminChats.find(chat => chat.sessionId === sessionId);
          const isConnected = Boolean(chat);
          const isChatOpen = chat?.isOpen === true;
          const isIncoming = chat?.isIncoming;

          const isOnline = onlineCustomers?.includes(sessionId);
          const isViewed = activeViewedCustomers?.includes(sessionId);

          let statusLabel = <span style={{ color: 'grey' }}>⚫ Offline</span>;
          let chatBtn = '';

          if (isOnline && isConnected && isChatOpen) {
            statusLabel = <span style={{ color: 'green' }}>🟢 Online</span>;
            chatBtn = <p>Chat opened</p>;
          } else if (isOnline && (!isConnected || !isChatOpen)) {
            statusLabel = isViewed
              ? <span style={{ color: 'green' }}>🟢 Online</span>
              : <span style={{ color: 'orange' }}>🟡 Away</span>;

            chatBtn = <YellowBtn className={`${isIncoming ? 'is-incoming' : ''}`} onClick={() => handleAddChat(sessionId)} text='Open Chat' />
          }

          return (
            <tr key={record.id}>
              <td className='chat-section'>
                {chatBtn}
                {statusLabel}
              </td>
              <td>{record.id}</td>
              <td>{record.session_id ?? 'No session_id'}</td>
              <td>{record.first_name}</td>
              <td>{record.last_name}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td className='message-td'>
                {record.message}
              </td>
            </tr>
          )
        })}
      </tbody>
    </TableWrapper>
  );
};

const CustomerList = () => (
  <List>
    <CustomCustomerTable />
  </List>
);

export default CustomerList;

