import { BsBarChart, BsChatLeftText, BsChatSquareDots, BsShieldLock } from 'react-icons/bs'
import { BiNotepad } from 'react-icons/bi'
import { FiArchive, FiBookmark, FiBox, FiCheckSquare, FiGrid, FiHome, FiLayers, FiShoppingBag, FiBarChart2, FiFileText, FiUsers, FiUserCheck } from 'react-icons/fi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { GoNote } from 'react-icons/go'

export const sidebarData = [
    {
        link: '/dashboard',
        icon: <MdOutlineSpaceDashboard />,
        header: "Dashboard",
        pages: [
            {
                id_active: 1,
                link: '/dashboard/task',
                icon: <FiCheckSquare />,
                name: "Tasks",
            },
            {
                id_active: 3,
                link: '/dashboard/note',
                icon: <GoNote />,
                name: "Notes",
            },
            {
                id_active: 4,
                link: '/dashboard/chat#firstchat',
                icon: <BsChatSquareDots />,
                name: "Chats",
            },
        ]
    },
    {
        link: '/bookmark',
        icon: <FiBookmark />,
        header: "Bookmark",
        pages: [
            {
                id_active: 2,
                link: '/dashboard/chart',
                icon: <BsBarChart />,
                name: "Charts",
            },
            {
                id_active: 5,
                link: '/dashboard/table',
                icon: <FiArchive />,
                name: "Tables",
            },
            {
                id_active: 6,
                link: '/dashboard/map',
                icon: <FiLayers />,
                name: "Maps",
            }
        ]
    }
]

export const sidebarAdmin = [
    {
        link: '/administrator',
        icon: <BsShieldLock />,
        header: "Administrator",
        pages: [
            {
                id_active: 1,
                link: '/dashboard/userlist',
                icon: <FiUsers />,
                name: "Userlist",
            },
            {
                id_active: 3,
                link: '/dashboard/userlog',
                icon: <FiUserCheck />,
                name: "Userlog",
            }
        ]
    }
]