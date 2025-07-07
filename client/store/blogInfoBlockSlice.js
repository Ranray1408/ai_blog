
import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBlogInfoBlock = createAsyncThunk(
	'blogInfoBlock/fetchBlogInfoBlock',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/blogInfoBlock');

		return response;
	});

const initialState = {
	blogInfoBlocksData: {
		blogInfoData1: {},
		blogInfoData2: {},
	},
	status: 'idle',
	error: null
}

const blogInfoBlockSlice = createSlice({
	name: 'blogInfoBlockState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogInfoBlock.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchBlogInfoBlock.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.blogInfoBlocksData = action.payload.blogsInfoData;
			})
			.addCase(fetchBlogInfoBlock.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
})

export default blogInfoBlockSlice.reducer;
