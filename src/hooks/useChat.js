"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUserChats } from '@/app/GlobalRedux/Features/chat/userChatsSlice'
import { updateOtherUsers } from '@/app/GlobalRedux/Features/chat/otherUsersSlice'

export const useChat = () => {

    const dispatch = useDispatch();
    const user = useSelector((state => state.user))
    const userChats = useSelector((state) => state.userChats);

    //------------ get UserChats-store to reducer ----------//
    const getUserChats = async (userId) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_CHAT}/chats/${userId}`);
            dispatch(updateUserChats(res.data));
        } catch (error) {
            console.log(error);
        }
    }

    //------------- get other suggest userchats -----------//
    const getOtherUser = async (userId) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/chatuser`);

        const existUserChats = userChats.map((item) => item.members.find((item) => item !== userId));

        const otherUserChats = res.data.messages.filter((item) => !(existUserChats.includes(item.id)) && item.id !== userId);

        dispatch(updateOtherUsers(otherUserChats));
    };
    useEffect(() => {
        if (userChats) {
            getOtherUser(user.id);
        }
    }, [userChats]);

    //------------- create new userchat -----------//
    const createChat = async (firstId, secondId) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_CHAT}/chats`, {
                firstId,
                secondId
            });
        } catch (error) {
            console.error(error);
        }
    }

    //------------- delete userchat -----------//
    const deleteChat = async (chatId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_CHAT}/chats/delete/${chatId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return { getUserChats, getOtherUser, createChat, deleteChat };
}
