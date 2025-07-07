import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTitleBlock = createAsyncThunk(
	'titleBlock/fetchTitleBlock',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/titleBlock');

		return response;
	});

const initialState = {
	titleBlocksData: {
		titleBlock1: {},
		titleBlock2: {},
		titleBlock3: {},
		titleBlock4: {},
	},
	status: 'idle',
	error: null
}

const titleBlockSlice = createSlice({
	name: 'titleBlockState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTitleBlock.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTitleBlock.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.blocksData = action.payload.titleBlocksData;
			})
			.addCase(fetchTitleBlock.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export default titleBlockSlice.reducer;
