'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface taskState {
    _id: string;
    title: string | number;
    category: string;
    deadline: string;
    description: string;
    createdAt: string | number;
    updatedAt: string | number;
    __v: string | number;
}

const initialState: taskState | null = null

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        updateTask: (state, action) => action.payload
    }
})

export const { updateTask } = taskSlice.actions;
export default taskSlice.reducer;