import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchHeader = createAsyncThunk(
	'header/fetchHeader',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/header');

		return response;
	});

const initialState = {
	headerText: '',
	navigation: [],
	contactButtonText: '',
	status: 'idle',
	error: null
}

const headerSlice = createSlice({
	name: 'headerState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeader.pending, (state) => {
				state.status = 'loading';

			})
			.addCase(fetchHeader.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.headerText = action.payload.headerText;
				state.navigation = action.payload.navigation;
				state.contactButtonText = action.payload.contactButtonText;
			})
			.addCase(fetchHeader.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export default headerSlice.reducer;
