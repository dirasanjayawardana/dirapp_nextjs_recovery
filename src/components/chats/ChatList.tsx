"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiLoader, FiTrash2 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useChat } from "@/hooks/useChat";
import { updateActiveChat } from "@/app/GlobalRedux/Features/chat/activeChatSlice";
import { useStateContext } from "@/contexts/ContextProvider";

const ChatList = ({ dataTrans, userId }: any) => {

    const dispatch = useDispatch();
    const onlineUsers = useSelector((state: any) => state.onlineUsers)
    const [recipientUser, setRecipientUser] = useState<any>(null);
    const { setShowUserChats, setSelectedRecipient } = useStateContext();
    const { getUserChats, deleteChat } = useChat();
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState(false);

    //------------- get recipient user by id -----------//
    useEffect(() => {
        if (dataTrans) {
            const getRecipientUser = async () => {
                try {
                    const recipientId = dataTrans.members.find((item: string) => item !== userId);
                    if (recipientId) {
                        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/chatuser/${recipientId}`);
                        setRecipientUser(res.data.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getRecipientUser();
        }
    }, [dataTrans])

    //---------------- delete userchat ---------------//
    const handleDelete = async (chatId: string) => {
        setLoading(true);
        await deleteChat(chatId);
        await getUserChats(userId);
        setLoading(false);
    }

    //-------------- set Current Active Chat -------------//
    const handleActiveChat = (item: any) => {
        dispatch(updateActiveChat(item))
        setSelectedRecipient(recipientUser)
    }


    return (
        <div>
            {recipientUser ?
                <div className="mt-2 border border-slate-400 w-full text-start hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl flex items-center justify-between">
                    <button
                        onClick={() => { handleActiveChat(dataTrans); setShowUserChats(false) }}
                        className="text-start w-full py-2 px-3 flex gap-1 items-center">
                        {onlineUsers && onlineUsers.some((user: any) => user.userId === recipientUser.id) ?
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            :
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        }
                        <h5>{recipientUser.name}</h5>
                    </button>
                    {confirm ?
                        <div className="flex gap-2 py-2 px-3 ">
                            <button
                                onClick={() => handleDelete(dataTrans._id)}>
                                {loading ?
                                    <FiLoader className='animate-spin-slow' />
                                    :
                                    <FiTrash2 className="text-red-500" />
                                }
                            </button>
                            <button
                                onClick={() => setConfirm(false)}
                                className="">
                                <MdOutlineCancel />
                            </button>
                        </div>
                        :
                        <button
                            onClick={() => setConfirm(true)}
                            className="hover:text-red-500 py-2 px-3 ">
                            {loading ?
                                <FiLoader className='animate-spin-slow' />
                                :
                                <FiTrash2 />
                            }
                        </button>
                    }
                </div>
                :
                <button className="mt-2 py-2 px-3 border border-slate-400 w-full text-start hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl flex justify-center">
                    <FiLoader className='animate-spin-slow' />
                </button>
            }
        </div>
    )
}

export default ChatList