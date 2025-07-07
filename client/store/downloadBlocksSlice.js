
import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDownloadBlocks = createAsyncThunk(
	'downloadBlocks/fetchDownloadBlocks',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/downloadBlocks');

		return response;
	});

const initialState = {
	downloadBlock1: {},
	downloadBlock2: {},
	status: 'idle',
	error: null
}

const downloadBlocksSlice = createSlice({
	name: 'downloadBlocks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDownloadBlocks.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchDownloadBlocks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.downloadBlock1 = action.payload.downloadBlock1;
				state.downloadBlock2 = action.payload.downloadBlock2;
			})
			.addCase(fetchDownloadBlocks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
})

export default downloadBlocksSlice.reducer;
