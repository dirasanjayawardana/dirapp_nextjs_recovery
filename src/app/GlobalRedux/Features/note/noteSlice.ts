'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface noteState {
    _id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const initialState: noteState | null = null

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        updateNote: (state, action) => action.payload
    }
})

export const { updateNote } = noteSlice.actions;
export default noteSlice.reducer;