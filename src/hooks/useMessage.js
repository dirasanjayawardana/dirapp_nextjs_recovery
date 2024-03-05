"use client"
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateMessages } from '../app/GlobalRedux/Features/chat/messagesSlice'
import { useStateContext } from "@/contexts/ContextProvider";

export const useMessage = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { setNewMessage } = useStateContext();

    //----------------- get Current Messages -------------//
    //------ menggunakan useCallback() sehingga fungsi tidak dirender ulang ketika fungsi di panggil di komponent lain kecuali depedensi berubah -----//
    const getMessages = useCallback(async (chatId) => {
        dispatch(updateMessages(null));
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_CHAT}/messages/${chatId}`);
            dispatch(updateMessages(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [user.id]);

    //----------------- create Current Messages -------------//
    const createMessage = async (chatId, senderId, text) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_CHAT}/messages`, {
                chatId, senderId, text
            });
            dispatch(updateMessages(res.data));
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
    }

    return { getMessages, createMessage };
}