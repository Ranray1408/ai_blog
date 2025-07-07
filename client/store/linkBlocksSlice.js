import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchLinkBlocks = createAsyncThunk(
	'linkBlocks/fetchLinkBlocks',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/linkBlocks');

		return response;
	});

const initialState = {
	linkBlocks: [],
	status: 'idle',
	error: null
}

const linkBlocksSlice = createSlice({
	name: 'linkBlocksState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLinkBlocks.pending, (state) => {
				state.status = 'loading';

			})
			.addCase(fetchLinkBlocks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.linkBlocks = action.payload.linkBlocks;
			})
			.addCase(fetchLinkBlocks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export default linkBlocksSlice.reducer;
