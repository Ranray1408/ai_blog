import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTitleLinksBlock = createAsyncThunk(
	'titleLinksBlock/fetchTitleLinksBlock',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/titleLinksBlock');

		return response;
	}
)

const initialState = {
	links: [],
	grayText: '',
	title: '',
	text: '',
	status: 'idle',
	error: null
}

const titleLinksBlockSlice = createSlice({
	name: 'titleLinksBlockState',
	initialState,
	reducer: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTitleLinksBlock.pending, (state) => {
				state.status = 'idle';
			})
			.addCase(fetchTitleLinksBlock.fulfilled, (state, action) => {
				state.status = 'successed';
				state.links = action.payload.links;
				state.grayText = action.payload.grayText;
				state.title = action.payload.title;
				state.text = action.payload.text;
			})
			.addCase(fetchTitleLinksBlock.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
	}
})

export default titleLinksBlockSlice.reducer;
