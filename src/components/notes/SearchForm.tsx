"use client"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link'

import { FiSearch } from 'react-icons/fi'
import { AiOutlineFileAdd } from 'react-icons/ai'


const Searchform = () => {

    const noteStore = useSelector((state: any) => state.note);
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);

    useEffect(() => {
        if (noteStore && searchInput !== "" && searchInput !== " ") {
            const filtered = noteStore.filter((item: any) => item.title.toLowerCase().includes(searchInput.toLowerCase()));
            setSearchResult(filtered);
        } else {
            setSearchResult(null);
        }
    }, [noteStore, searchInput])

    return (
        <div className='relative'>
            <form className="dark:bg-slate-700 bg-gray-100 rounded-2xl py-2 px-6 flex items-center justify-between shadow-md">
                <div className="flex gap-2 items-center justify-start">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder='Search Notes'
                        className='py-1 px-4 rounded-xl bg-transparent' />
                    <button
                        type='button'
                        className='hover:scale-125 transition p-2 text-gray-400'>
                        <FiSearch size={24} />
                    </button>
                </div>

                <Link href='/dashboard/note/addnew'>
                    <div className="flex item-center gap-2 font-bold hover:scale-110 transition cursor-pointer">
                        <AiOutlineFileAdd size={24} />
                    </div>
                </Link>
            </form>

            {searchResult &&
                <div className="absolute z-10 mt-3 w-full max-w-sm">
                    <ul className='p-2 rounded-xl shadow-md bg-white text-black flex flex-col gap-1'>
                        {searchResult.map((item: any, index: number) => {
                            return (
                                <Link href={`/dashboard/note/edit/${item._id}`}>
                                    <li key={index} className=' hover:bg-gray-100 rounded-md px-3'>
                                        <button className='text-left mx-1'>{item.title}</button>
                                        <hr />
                                    </li>
                                </Link>
                            )
                        })}

                        {searchResult.length === 0 &&
                            <li className=' rounded-md px-3'>
                                <button className='text-left mx-1'>
                                    No Result
                                </button>
                                <hr />
                            </li>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default Searchform