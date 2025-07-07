import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchHeroBanner = createAsyncThunk(
	'heroBanner/fetchHeroBanner',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/heroBanner');

		return response;
	});

const initialState = {
	statistics: [],
	uptitle: '',
	title: '',
	suptitle: '',
	infoTitle: '',
	infotText: '',
	buttonText: '',
	status: 'idle',
	error: null
}

const heroBannerSlice = createSlice({
	name: 'heroBannerState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroBanner.pending, (state) => {
				state.status = 'loading';

			})
			.addCase(fetchHeroBanner.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.statistics = action.payload.statistics;
				state.uptitle = action.payload.uptitle;
				state.title = action.payload.title;
				state.suptitle = action.payload.suptitle;
				state.infoTitle = action.payload.infoTitle;
				state.infotText = action.payload.infotText;
				state.buttonText = action.payload.buttonText;
			})
			.addCase(fetchHeroBanner.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});

export default heroBannerSlice.reducer;
