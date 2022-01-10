import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		id: 0,
		email: "",
		username: "",
		fullname: "",
		url_image: "",
		address: "",
		telephone: "",
		gender: "",
	},
	reducers: {
		storeUser: (state, action) => {
			state.id = action.payload.id;
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.fullname = action.payload.fullname;
			state.url_image = action.payload.url_image;
			state.telephone = action.payload.telephone;
			state.address = action.payload.address;
			state.gender = action.payload.gender;
		},
		clearUser: (state) => {
			state.id = 0;
			state.email = "";
			state.username = "";
			state.fullname = "";
			state.url_image = "";
			state.address = "";
			state.telephone = "";
			state.gender = "";
		},
	},
});

export const { storeUser, clearUser } = userSlice.actions;
export default userSlice.reducer;