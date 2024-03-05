'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

// declare
export const stateContext = createContext();

// use in component
export const useStateContext = () => {
    return useContext(stateContext)
}

export const ContextProvider = ({ children }) => {

    const [currentMode, setCurrentMode] = useState('dark');
    const [currentColor, setCurrentColor] = useState("#1798fe");
    const [showMode, setShowMode] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showActiveSide, setShowActiveSide] = useState();
    const [screenSize, setScreenSize] = useState(100);
    const [showTimeOut, setShowTimeOut] = useState(false);
    const [showUserChats, setShowUserChats] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const handleChangeMode = (e) => {
        setShowMode(false);
        setShowSidebar(true);
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setShowMode(false);
        setShowSidebar(true);
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    useEffect(() => {
        // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     setCurrentMode("dark")
        // } else {
        //     setCurrentMode("dark")
        // }

        const screenWidth = window.innerWidth;
        if (screenWidth >= 1280) {
            setShowSidebar(true)
        }
    }, [])


    return (
        <stateContext.Provider value={{
            currentMode, setCurrentMode,
            handleChangeMode,
            showMode, setShowMode,
            showSidebar, setShowSidebar,
            showOverlay, setShowOverlay,
            screenSize, setScreenSize,
            showActiveSide, setShowActiveSide,
            currentColor, setCurrentColor, setColor,
            showTimeOut, setShowTimeOut,
            showUserChats, setShowUserChats,
            socket, setSocket,
            selectedRecipient, setSelectedRecipient,
            newMessage, setNewMessage,
            notifications, setNotifications
        }}>
            {children}
        </stateContext.Provider>
    )
}
