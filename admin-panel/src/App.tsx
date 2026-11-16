import AdminApp from '@/components/AdminApp/AdminApp';
import AdminChats from '@/components/AdminChats/AdminChats';

// In the client, AdminChats was rendered by LayoutWrapper on /admin; here it sits next to the react-admin app
export default function App() {
	return (
		<>
			<AdminApp />
			<AdminChats />
		</>
	);
}
