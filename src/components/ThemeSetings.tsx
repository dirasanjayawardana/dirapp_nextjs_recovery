"use client"
import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { useStateContext } from '../contexts/ContextProvider';
import { FiCheck } from 'react-icons/fi';

const ThemeSettings = () => {

  const { currentMode, handleChangeMode, setShowMode, currentColor, setColor } = useStateContext();

  return (
    <div className="bg-black/30 w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-slate-700 w-80 overflow-auto">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setShowMode(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl">Theme Option</p>

          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="light"
              className="cursor-pointer"
              onChange={handleChangeMode}
              checked={currentMode === 'light'}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="dark"
              className="cursor-pointer"
              onChange={handleChangeMode}
              checked={currentMode === 'dark'}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>

        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Color Option</p>

          <div className="mt-4 flex justify-around">
            <button onClick={() => setColor("#1798fe")}>
              <div
                className="bg-[#1798fe] rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                {currentColor === "#1798fe" && <FiCheck />}
              </div>
            </button>
            <button onClick={() => setColor("#36d399")}>
              <div
                className="bg-[#36d399] rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                {currentColor === "#36d399" && <FiCheck />}
              </div>
            </button>
            <button onClick={() => setColor("#fbbd23")}>
              <div
                className="bg-[#fbbd23] rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                {currentColor === "#fbbd23" && <FiCheck />}
              </div>
            </button>
            <button onClick={() => setColor("#f87272")}>
              <div
                className="bg-[#f87272] rounded-full w-10 h-10 flex items-center justify-center text-2xl">
                {currentColor === "#f87272" && <FiCheck />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
