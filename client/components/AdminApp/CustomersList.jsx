import { useListContext, List } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminChatSocket } from '@/Helpers/custom-hooks';
import { addAdminChat } from '@/store/adminChatsSlice';
import { adminSocket } from '@/Helpers/adminSocketInstance';
import { YellowBtn } from '../UI/Buttons';
import styled from '@emotion/styled';

const TableWrapper = styled.table`
  border-radius: 15px;
  min-width: 1200px;
  border-collapse: collapse;

  thead {

  }

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
`;

const OpenChatButton = ({ sessionId, isConnected, onClick }) => {
  const handleOpenChat = () => {
    if (!isConnected) {
      onClick(sessionId);
    }
  };

  return (
    isConnected
      ? <p>Chat opened</p>
      : <YellowBtn onClick={handleOpenChat} disabled={isConnected} text='Open Chat' />
  );
};


const CustomCustomerTable = () => {
  const { data, isLoading } = useListContext();
  const onlineCustomers = useSelector(state => state.adminActiveCustomersState.list);
  const dispatch = useDispatch();
  const adminChats = useSelector(state => state.adminChatsState.chats);
  const activeViewedCustomers = useSelector(state => state.adminActiveCustomersState.viewed);

  useAdminChatSocket();

  const handleAddChat = (sessionId) => {
    adminSocket.emit('get_chat_history', { sessionId });

    adminSocket.on('history_messages', ({ sessionId, chatMessages }) => {
      console.log('chatHistory', chatMessages);

      dispatch(addAdminChat({ sessionId, chatMessages }));
    });
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
          const isConnected = adminChats.some(chat => chat.sessionId === record.session_id);

          const isOnline = onlineCustomers?.includes(record.session_id);
          const isViewed = activeViewedCustomers?.includes(record.session_id);

          let statusLabel = <span style={{ color: 'grey' }}>⚫ Offline</span>;
          let chatBtn = '';
          if (isOnline && isViewed) {
            statusLabel = <span style={{ color: 'green' }}>🟢 Online</span>;
            chatBtn = <OpenChatButton
              sessionId={record.session_id}
              isConnected={isConnected}
              onClick={handleAddChat}
            />;
          } else if (isOnline && !isViewed) {
            chatBtn = <OpenChatButton
              sessionId={record.session_id}
              isConnected={isConnected}
              onClick={handleAddChat}
            />;
            statusLabel = <span style={{ color: 'orange' }}>🟡 Away</span>;
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

