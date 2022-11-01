import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        link : "src/assets/DefaultProfilePic/user.jpg"
    },
    reducers: {
        save: (state, action) => {
            state.link = action.payload
            console.log("payload,", action)
        }
    },
});

export const {save} = profileSlice.actions;
export default profileSlice.reducer;
