"use client"
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOnlineUsers } from '../app/GlobalRedux/Features/user/onlineUsersSlice'
import { io } from 'socket.io-client'
import { useStateContext } from "@/contexts/ContextProvider";
import { updateMessages } from "@/app/GlobalRedux/Features/chat/messagesSlice";

export const useWebSocket = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const messages = useSelector((state) => state.messages);
    const activeChat = useSelector((state) => state.activeChat);
    const { socket, setSocket, selectedRecipient, setNotifications } = useStateContext();

    //------------ setup connection -----------//
    const makeConnection = () => {
        // membuat koneksi socket baru
        const newSocket = io(`${process.env.NEXT_PUBLIC_API_SOCKET}`);
        setSocket(newSocket);
        // ketika komponent yang menggunakan fungsi ini ditutup/dimatikan maka koneksi/socket akan diputus
        return () => {
            newSocket.disconnect();
        }
    }

    //----------- getOnlineUsers -------------//
    const getOnlineUsers = () => {
        if (socket === null) return;
        socket.emit("addNewUser", user?.id);
        socket.on("getOnlineUsers", (res) => {
            dispatch(updateOnlineUsers(res));
        });
        // setiap melakukan listener (socket.on) selalu matikan listener (socket.off)
        return () => {
            socket.off("getOnlineUsers");
        }
    }

    //----------- realtime send message -------------//
    const sendMessage = () => {
        if (socket === null) return;
        const recepientId = selectedRecipient?.id;
        socket.emit("sendMessage", { messages, recepientId });
    }

    //----------- realtime receive message -------------//
    const receiveMessage = () => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            dispatch(updateMessages(res.messages));
        });
        // socket.on("getNotification", (res) => {
        //     const isChatOpen = activeChat?.members.some((id) => id === res.senderId);

        //     if(isChatOpen) {
        //         setNotifications((prev) => [{...res, isRead: true}, ...prev]);
        //     } else {
        //         setNotifications((prev) => [res, ...prev])
        //     }
        // });

        // setiap melakukan listener (socket.on) selalu matikan listener (socket.off)
        return () => {
            socket.off("getMessage");
            // socket.off("getNotification");
        }
    }


    return { makeConnection, getOnlineUsers, sendMessage, receiveMessage }
}



//   useEffect(() => {
//     makeConnection();
//   }, [user]);

//   useEffect(() => {
//     getOnlineUsers();
//   }, [socket])


//   useEffect(() => {
//     sendMessage();
//   }, [messages])

//   useEffect(() => {
//     receiveMessage();
//   }, [socket, activeChat])
