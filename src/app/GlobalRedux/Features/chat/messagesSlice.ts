import { createSlice } from '@reduxjs/toolkit';

const initialState: any[] | null = null; // Mengatur initialState sebagai array atau null

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        updateMessages: (state, action) => {
            if (state === null || action.payload == null || Array.isArray(action.payload)) {
                return action.payload;
            }
            return [...state, action.payload];

            // Menggunakan spread operator hanya jika state tidak null
            // return state !== null && action.payload !== null && !Array.isArray(action.payload) ? [...state, action.payload] : action.payload;
        }
    }
});

export const { updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
