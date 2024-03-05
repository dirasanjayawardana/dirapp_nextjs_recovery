'use client';
import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from '../../../../validation/isEmpty'

export interface userState {
    _id: string;
    id: string;
    name: string | number;
    email: string;
    password: string;
    role: string;
    exp: string | number;
    iat: string | number;
    __v: string | number;
    isConnected: boolean;
}

const initialState: any  = {
    id: null,
    name: "",
    email: "",
    password: "",
    role: "",
    exp: "",
    iat: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => state = action.payload
    }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;