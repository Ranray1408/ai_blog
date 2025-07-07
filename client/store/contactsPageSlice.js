import { HttpClientFactory } from '@/Helpers/httpClientFactory/HttpClientFactory';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchContactsPage = createAsyncThunk(
	'contactsPage/fetchContactsPage',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const responce = httpClient.get('http://localhost:5000/api/contactsPage');

		return responce;
	}
);

const initialState = {
	svgIcons: '',
	title: '',
	inputs: [],
	status: 'idle',
	error: null
}

const contactsPageSlice = createSlice({
	name: 'contactsPageState',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchContactsPage.pending, (state) => {
			state.status = 'idle';
		})
		builder.addCase(fetchContactsPage.fulfilled, (state, action) => {
			state.status = 'successed';
			state.title = action.payload.title;
			state.svgIcons = action.payload.svgIcons;
			state.inputs = action.payload.inputs;
		})
		builder.addCase(fetchContactsPage.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		})
	}
});


export default contactsPageSlice.reducer;
