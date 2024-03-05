'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import noteReducer from './Features/note/noteSlice';
import taskReducer from './Features/task/taskSlice';
import userReducer from './Features/user/userSlice';
import onlineUsersReducers from './Features/user/onlineUsersSlice';
import userChatsReducer from './Features/chat/userChatsSlice';
import otherUsersReducer from './Features/chat/otherUsersSlice';
import activeChatReducer from './Features/chat/activeChatSlice';
import messagesReducer from './Features/chat/messagesSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        note: noteReducer,
        task: taskReducer,
        user: userReducer,
        userChats: userChatsReducer,
        otherUsers: otherUsersReducer,
        activeChat: activeChatReducer,
        messages: messagesReducer,
        onlineUsers: onlineUsersReducers
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;