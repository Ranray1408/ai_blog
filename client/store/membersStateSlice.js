import { HttpClientFactory } from "@/Helpers/httpClientFactory/HttpClientFactory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMembers = createAsyncThunk(
	'membersList/fetchMembers',
	async () => {
		const httpClient = HttpClientFactory.create('fetch');
		const response = await httpClient.get('http://localhost:5000/api/membersList');

		return response;
	});

const initialState = {
	members: [],
	status: 'idle',
	error: null
};

const membersSlice = createSlice({
	name: 'membersList',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMembers.pending, (state) => {
				state.status = 'idle';
			})
			.addCase(fetchMembers.fulfilled, (state, action) => {
				state.status = 'successed';
				state.members = action.payload;
			})
			.addCase(fetchMembers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})

	}
})

export default membersSlice.reducer;
