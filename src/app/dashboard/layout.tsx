"use client"
import React from 'react'
import { useStateContext } from '@/contexts/ContextProvider'
import { ThemeSetings, Sidebar, Navbar, Footer } from '../../components'
import { FiSettings } from 'react-icons/fi';
import { IsConnected } from '@/validation/IsConnected';


const layout = ({ children }: { children: React.ReactNode }) => {

    const { currentMode, showMode, setShowMode, showSidebar, setShowSidebar, currentColor } = useStateContext();

    return (
        <IsConnected>
            <div className={`${currentMode === "dark" ? "dark" : ""}`}>
                <div className="dark:bg-slate-800 dark:text-white min-h-screen pb-3">

                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                        <button
                            type="button"
                            onClick={() => { setShowMode(true); setShowSidebar(false); }}
                            className={`text-2xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray bg-[${currentColor}] rounded-2xl`}
                        >
                            <FiSettings />
                        </button>
                    </div>

                    <div
                        className={`fixed xl:hidden bg-black/40 z-40 top-0 left-0 w-full h-full transition-opacity ${showSidebar ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                        onClick={() => setShowSidebar(false)}
                    />

                    <div className="flex min-h-screen">
                        <div className={`${showSidebar ? "xl:ml-60" : "ml-0"} transition-all w-full overflow-auto`}>

                            <div className={`${showSidebar ? "xl:pr-60" : "pr-0"} fixed z-30 w-full transition-all`}>
                                <Navbar />
                            </div>

                            <div className="mt-20 mx-auto max-w-[1500px] px-2 sm:px-10">
                                {children}
                            </div>
                        </div>

                        <Sidebar />
                    </div>

                    {showMode && <div className="relative z-40"><ThemeSetings /></div>}

                    <div className="relative flex justify-center mt-8">
                        <Footer />
                    </div>

                </div>
            </div>
        </IsConnected>
    )
}

export default layout