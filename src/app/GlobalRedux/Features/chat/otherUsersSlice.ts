'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState: any = null

const otherUsersSlice = createSlice({
    name: 'otherUsers',
    initialState,
    reducers: {
        updateOtherUsers: (state, action) => action.payload
    }
})

export const { updateOtherUsers } = otherUsersSlice.actions;
export default otherUsersSlice.reducer;