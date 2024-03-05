'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

const activeChatSlice = createSlice({
    name: 'activeChat',
    initialState,
    reducers: {
        updateActiveChat: (state, action) => action.payload
    }
})

export const {updateActiveChat} = activeChatSlice.actions;
export default activeChatSlice.reducer;