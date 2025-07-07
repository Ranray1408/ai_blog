import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPopupOpened: false,
};

const mainStatesSlice = createSlice({
	name: 'mainStates',
	initialState,
	reducers: {
		togglePopup: (state, action) => {
			state.isPopupOpened = action.payload;
		}
	}
})

export default mainStatesSlice.reducer;
export const { togglePopup } = mainStatesSlice.actions;
