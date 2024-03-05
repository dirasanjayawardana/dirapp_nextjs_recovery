"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '../../hooks/useChat';
import { updateOtherUsers } from '@/app/GlobalRedux/Features/chat/otherUsersSlice';

const OtherChatList = ({ dataTrans, userId }: any) => {

    const dispatch = useDispatch();
    const onlineUsers = useSelector((state: any) => state.onlineUsers);
    const { getUserChats, createChat }: any = useChat();

    const handleCreateChat = async (firstId: string, secondId: string) => {
        dispatch(updateOtherUsers(null));
        await createChat(firstId, secondId);
        await getUserChats(userId);
    };

    return (
        <div className="">
            {dataTrans && dataTrans.map((user: any, index: number) => {
                return (
                    <div key={index} className="">
                        <button
                            onClick={() => handleCreateChat(userId, user.id)}
                            className="mt-2 py-2 px-3 border border-slate-400 w-full text-start hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl flex gap-1 items-center">
                            {onlineUsers && onlineUsers.some((online: any) => online.userId === user.id) ?
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                :
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            }
                            <h3 className="">{user.name}</h3>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default OtherChatList