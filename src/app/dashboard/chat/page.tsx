"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Header, ChatArea } from '@/components'
import { updateUserChats } from '@/app/GlobalRedux/Features/chat/userChatsSlice'
import { updateOtherUsers } from '@/app/GlobalRedux/Features/chat/otherUsersSlice'
import { useChat } from '@/hooks/useChat'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useStateContext } from '@/contexts/ContextProvider'

const page = () => {

  const user = useSelector((state: any) => state.user);
  const userChats = useSelector((state: any) => state.userChats);
  const activeChat = useSelector((state: any) => state.activeChat);
  const messages = useSelector((state: any) => state.messages);
  const { socket, newMessage, notifications } = useStateContext();

  const { getUserChats, getOtherUser } = useChat();
  const { makeConnection, getOnlineUsers, sendMessage, receiveMessage } = useWebSocket();

  //------------- get UserChats and store to reducer -----------//
  useEffect(() => {
    if (user.id) {
      getUserChats(user.id);
    }
  }, [user.id])


  //------------- get other suggest userchats -----------//
  useEffect(() => {
    if (userChats) {
      getOtherUser(user.id);
    }
  }, [userChats]);


  // //------ initial socket connection - getOnlineUsers -----//
  // useEffect(() => {
  //   makeConnection();
  // }, [user]);

  // useEffect(() => {
  //   getOnlineUsers();
  // }, [socket])


  // //-------------- real time changed message -----------//
  // useEffect(() => {
  //   sendMessage();
  // }, [newMessage])

  // useEffect(() => {
  //   receiveMessage();
  // }, [socket, activeChat])


  return (
    <div className='w-full'>
      <Header page="Dashboard" item="Live Chat" />

      <ChatArea />
    </div>
  )
}

export default page