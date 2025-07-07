import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	list: []
};

export const adminActiveCustomersSlice = createSlice({
	name: 'adminActiveCustomers',
	initialState,
	reducers: {
		updateOnlineCustomers: (state, action) => {
			state.list = action.payload;
		},
		addOnlineCustomer: (state, action) => {
			if (!state.list.includes(action.payload)) {
				state.list.push(action.payload);
			}
		},
		removeOnlineCustomer: (state, action) => {
			state.list = state.list.filter(id => id !== action.payload);
		}
	}
});

export const {
	updateOnlineCustomers,
	addOnlineCustomer,
	removeOnlineCustomer
} = adminActiveCustomersSlice.actions;

export default adminActiveCustomersSlice.reducer;
