"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
// @ts-ignore
import InputEmoji from "react-input-emoji";
import { BsFillChatLeftTextFill } from 'react-icons/bs'
import { FiLoader, FiSearch, FiSend } from 'react-icons/fi'
import { BiMessageSquareAdd, BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'
import { io } from 'socket.io-client'

import ava1 from '../../data/avatar/avatar1.png'
import ava2 from '../../data/avatar/avatar2.png'
import ava3 from '../../data/avatar/avatar3.png'
import ava4 from '../../data/avatar/avatar4.png'
import ava5 from '../../data/avatar/avatar5.png'
import ChatList from './ChatList'
import OtherChatList from './OtherChatList'
import { useStateContext } from '@/contexts/ContextProvider'
import { useMessage } from '../../hooks/useMessage'


const ChatArea = () => {

    const user = useSelector((state: any) => state.user);
    const onlineUsers = useSelector((state: any) => state.onlineUsers);
    const userChats = useSelector((state: any) => state.userChats);
    const otherUsers = useSelector((state: any) => state.otherUsers);
    const activeChat = useSelector((state: any) => state.activeChat);
    const messages = useSelector((state: any) => state.messages);
    const { getMessages, createMessage } = useMessage();
    const { showUserChats, setShowUserChats, selectedRecipient, newMessage, setNewMessage } = useStateContext();
    const [LoadMessage, setLoadMessage] = useState(false);
    const [noMessage, setNoMessage] = useState(false);
    const scroll: any = useRef();

    //----------------- get Current Messages -------------//
    useEffect(() => {
        if (activeChat) {
            setLoadMessage(true);
            getMessages(activeChat._id);
        }
    }, [activeChat]);

    useEffect(() => {
        if (messages && messages.length === 0) {
            setNoMessage(true);
        } else {
            setNoMessage(false);
        }
    }, [messages])

    //----------------- create Current Messages -------------//
    const handleSendMessage = async (chatId: string, senderId: string, text: string) => {
        await createMessage(chatId, senderId, text);
    }

    //--------------- scroll to bottom message --------------//
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    return (
        <div className="-mt-3 md:-mt-5 sm:mb-0">
            <div className='bg-gray-100 dark:bg-slate-700 rounded-2xl overflow-hidden max-w-[1000px] mx-auto'>

                <div className="w-full h-12 bg-gray-200 dark:bg-slate-600 flex items-center gap-2 pl-3">
                    <div className='w-3 h-3 rounded-full bg-[#f87272]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#fbbd23]'></div>
                    <div className='w-3 h-3 rounded-full bg-[#0bc9c9]'></div>

                    <button
                        onClick={() => setShowUserChats(!showUserChats)}
                        className="flex items-center gap-2 py-[3px] rounded-md">
                        {showUserChats ?
                            <BiSolidLeftArrow size={10} />
                            :
                            <BiSolidRightArrow size={10} />
                        }
                        <BsFillChatLeftTextFill className='mt-[2px]' />
                    </button>

                    {selectedRecipient &&
                        <div className="ml-2">
                            <h3 className=''>{selectedRecipient.name}</h3>
                            {onlineUsers && onlineUsers.some((user: any) => user.userId === selectedRecipient.id) ?
                                <div className="-mt-[2px] flex gap-1 items-center">
                                    <div className="mt-[2px] w-2 h-2 bg-green-400 rounded-full"></div>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>online</p>
                                </div>
                                :
                                <div className="-mt-[2px] flex gap-1 items-center">
                                    <div className="mt-[2px] w-2 h-2 bg-red-400 rounded-full"></div>
                                    <p className='text-xs text-gray-600 dark:text-gray-400'>offline</p>
                                </div>
                            }
                        </div>
                    }
                </div>

                <div className="flex relative rounded-md text-gray-500 dark:text-gray-300 text-sm">

                    {/*--------------------- chat List --------------------*/}
                    <div className={`${showUserChats ? "w-72 xl:w-80 z-20 translate-x-0 opacity-100 overflow-y-auto" : "md:w-0 -z-10 -translate-x-60 opacity-0"} h-[76vh] bg-gray-100 dark:bg-slate-700 absolute xl:relative transition-all overflow-hidden p-4 shadow-md`}>
                        <div className="min-h-full">
                            <div className="rounded-xl py-1 px-3 border border-gray-400 flex gap-1 justify-between">
                                <input
                                    type='text'
                                    placeholder='Search or start new chat'
                                    className='bg-transparent focus:outline-none'
                                />
                                <button className='p-1 hover:scale-125 transition text-xl'>
                                    <FiSearch size={17} />
                                </button>
                            </div>

                            <button className="w-full mt-3 py-2 px-3 rounded-xl bg-gray-200 dark:bg-slate-600 flex items-center gap-2">
                                <BiMessageSquareAdd size={20} />
                                <h3>Start new chat</h3>
                            </button>

                            <div className="mt-1">
                                <div className="mt-2">
                                    <p className="text-gray-400 text-xs px-1">Your chats</p>
                                    {userChats && userChats.map((item: any, index: number) => (
                                        <ChatList key={index} dataTrans={item} userId={user.id} />
                                    ))}
                                </div>
                                {otherUsers ?
                                    <div className="mt-3">
                                        <p className="text-gray-400 text-xs px-1">Chat with other</p>
                                        <OtherChatList dataTrans={otherUsers} userId={user.id} />
                                    </div>
                                    :
                                    <button className="mt-3 py-2 px-3 border border-slate-400 w-full text-start hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl flex justify-center">
                                        <FiLoader className='animate-spin-slow' />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>


                    {/*--------------------- Active message Area --------------------*/}
                    <div className="sm:p-5 py-3 sm:py-5 px-3 flex flex-col justify-between rounded-2xl w-full h-[76vh]">
                        {messages ?
                            noMessage ?
                                <div className="h-full w-full flex items-center justify-center">
                                    <h3 className='text-gray-400'>No message yet</h3>
                                </div>
                                :
                                <div className='h-full overflow-auto pr-3 -mr-3'>
                                    <div className="max-w-[700px] mx-auto mb-3">
                                        {messages.map((item: any, index: number) => (
                                            <div
                                                key={index}
                                                ref={scroll}
                                                className={`chat ${item.senderId === user.id ? "chat-end" : "chat-start"}`}
                                            >
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        {item.senderId === user.id ?
                                                            <Image src={ava3} alt='img' />
                                                            :
                                                            <Image src={ava4} alt='img' />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    <time className="ml-2 text-xs opacity-50">{item.createdAt.substring(0, 16).replace("T", " ")}</time>
                                                </div>
                                                <div className="chat-bubble my-1 text-black dark:text-white bg-white dark:bg-slate-800">{item.text}</div>
                                                <div className="chat-footer opacity-50">
                                                    Delivered
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </div>
                                </div>
                            :
                            <div className="h-full w-full flex items-center justify-center">
                                {LoadMessage ?
                                    <FiLoader size={25} className='animate-spin-slow' />
                                    :
                                    <h3 className='text-gray-400'>No chat choosen</h3>
                                }
                            </div>
                        }

                        <div className='bg-gray-200 dark:bg-slate-600 items-center gap-2 rounded-2xl w-full max-w-[800px] xl:max-w-[700px] sm:mx-auto flex'>
                            {/* <div className='w-full flex items-center gap-2'>
                                <button className='p-2 hover:scale-125 transition text-xl text-gray-600 dark:text-gray-300'>
                                    <ImAttachment />
                                </button>
                                <input type='text' placeholder='Type a message' className='w-full focus:outline-none bg-transparent rounded-xl p-2' />
                            </div> */}
                            <div className='w-full -ml-1'
                            // className="w-[84.8%] md:w-[92.8%] -ml-1"
                            >
                                <InputEmoji
                                    value={newMessage}
                                    onChange={setNewMessage}
                                    borderRadius={16}
                                    borderColor="rgba(0,0,0,0)"
                                    placeholder="Press enter to send"
                                    // cleanOnEnter
                                    onEnter={() => handleSendMessage(activeChat._id, user.id, newMessage)}
                                />
                            </div>
                            {/* <button
                                onClick={() => handleSendMessage(activeChat._id, user.id, newMessage)}
                                disabled={!activeChat}
                                className='w-[15%] md:w-[7%] p-2 hover:scale-125 transition text-2xl'>
                                <FiSend />
                            </button> */}
                        </div>
                    </div>

                </div>

            </div>
        </div >
    )
}

export default ChatArea;