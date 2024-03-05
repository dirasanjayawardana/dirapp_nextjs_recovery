'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const onlineUsersSlice = createSlice({
    name: 'onlineUsers',
    initialState,
    reducers: {
        updateOnlineUsers: (state, action) => action.payload
    }
})

export const { updateOnlineUsers } = onlineUsersSlice.actions;
export default onlineUsersSlice.reducer;