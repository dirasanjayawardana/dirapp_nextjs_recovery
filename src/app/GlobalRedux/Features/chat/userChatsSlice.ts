'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = null

const userChatsSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        updateUserChats: (state, action) => action.payload
    }
})

export const { updateUserChats } = userChatsSlice.actions;
export default userChatsSlice.reducer;