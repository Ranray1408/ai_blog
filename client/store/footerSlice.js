import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFooter = createAsyncThunk(
	'footer/fetchFooter',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/footer');

		return response;;
	}
)

const initialState = {
	footerMenus: [
		{
			menuName: '',
			menuItems: [
				{
					itemName: '',
					itemUrl: '',
					isNew: false
				}
			]
		}
	],
	footerBottomInfo: {
		policy: [
			{
				itemName: '',
				itemUrl: ''
			}
		],
		socials: [
			{
				socialId: 0,
				socialIcon: '',
				socialUrl: ''
			}
		],
		ps: ''
	},
	status: 'idle',
	error: null
}

export const footerSlice = createSlice({
	name: 'footer',
	initialState,
	reducer: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFooter.pending, (state) => {
				state.status = 'idle';
			})
			.addCase(fetchFooter.fulfilled, (state, action) => {
				state.status = 'successed';
				state.footerMenus = action.payload.footerMenus;
				state.footerBottomInfo = action.payload.footerBottomInfo;
			})
			.addCase(fetchFooter.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
	}
})

export default footerSlice.reducer;
