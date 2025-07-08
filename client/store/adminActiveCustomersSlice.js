import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	list: [],
	viewed: [],
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
		},
		markCustomerAsAway: (state, action) => {
			state.viewed = state.viewed.filter(id => id !== action.payload);
		},
		markCustomerAsBack: (state, action) => {
			if (!state.viewed.includes(action.payload)) {
				state.viewed.push(action.payload);
			}
		},
	}
});

export const {
	updateOnlineCustomers,
	addOnlineCustomer,
	removeOnlineCustomer,
	markCustomerAsBack,
	markCustomerAsAway,
} = adminActiveCustomersSlice.actions;

export default adminActiveCustomersSlice.reducer;
