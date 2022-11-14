import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: number,
  username: string;
  fullName: string;
  password: string;
  create_At: Date;
  update_At: Date;
  token: string;
}

const initialState: UserState = { id: 0,  username: "", fullName: "", password: "", create_At: new Date(), update_At: new Date(), token: ""};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    enterUserNamesValue: (state, action) => {
      state.fullName = action.payload;
    },
    enterUserTokenValue: (state, action) => {
      state.token = action.payload;
    },
    deleteUserValue: (state, action) => {
      return initialState
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;