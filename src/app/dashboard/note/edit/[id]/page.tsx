"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Header, PleaseWait, SearchForm } from '@/components'
import { useStateContext } from '@/contexts/ContextProvider'
import { useParams, useRouter } from 'next/navigation'
import { FaTerminal } from 'react-icons/fa'
import { BiLoaderAlt } from 'react-icons/bi'
import { FiSave } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'

const page = () => {

  const params = useParams();
  const router = useRouter();
  const { setShowTimeOut } = useStateContext();
  const [prevData, setPrevData] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let success = 0;
      while (success < 6) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/edit/${params.id}`);
          const data = res.data.messages;
          
          setPrevData(data);
          setNoteTitle(data.title);
          setNoteContent(data.description);
          success = 9;
        } catch (error) {
          console.log(error);
          await new Promise(res => setTimeout(res, 6000));
          success === 5 && setShowTimeOut(true);
        }
      }
    };
    getData();
  }, [])


  const handleNoteTitle = (e: any) => {
    e.preventDefault();
    setNoteTitle(e.target.value);
  };

  const handleTextareaChange = (e: any) => {
    e.preventDefault();
    setNoteContent(e.target.value);
    e.target.rows = e.target.value.split('\n').length;
  };


  const handleSave = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${params.id}`, {
        newTitle: noteTitle,
        newDescription: noteContent
      })

      router.push('/dashboard/note')
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  return (
    <div>
      <Header page="Dashboard" item="Notes" />
      <SearchForm />
      {prevData ?
        <div className='mt-4 bg-gray-100 dark:bg-slate-700 rounded-2xl overflow-hidden'>

          <div className="w-full h-10 bg-gray-200 dark:bg-slate-600 flex items-center gap-2 pl-3">
            <div className='w-3 h-3 rounded-full bg-[#f87272]'></div>
            <div className='w-3 h-3 rounded-full bg-[#fbbd23]'></div>
            <div className='w-3 h-3 rounded-full bg-[#0bc9c9]'></div>
            <div className="flex w-full justify-between pl-2 items-center text-gray-500 dark:text-gray-300 gap-3 py-1">
              <FaTerminal />
              <div className="flex">
                <button
                  onClick={() => router.push('/dashboard/note')}
                  className='h-full py-[7px] px-2 bg-red-400 flex items-center gap-2 font-bold text-white hover:bg-red-500'>
                  <MdOutlineCancel size={22}/>
                  <h5 className='text-sm'>Cancel</h5>
                </button>
                <button
                  onClick={handleSave}
                  className="h-full py-[7px] px-3 bg-blue-500 flex items-center gap-2 font-bold text-white hover:bg-blue-600">
                  {loading ?
                    <BiLoaderAlt size={22} className='animate-spin' />
                    :
                    <FiSave size={22} />
                  }
                  <h5 className='text-sm'>Save</h5>
                </button>
              </div>
            </div>
          </div>

          <div className="font-terminal rounded-md text-gray-500 dark:text-gray-300 text-md sm:p-5 py-5 px-3">
            <input
              type='text'
              onChange={handleNoteTitle}
              value={noteTitle}
              className='bg-transparent text-xl font-bold px-5 focus:outline-none rounded-xl border-2 border-gray-100 dark:border-slate-700 w-full' placeholder='Input title' />
            <textarea
              // cols={50}
              rows={noteContent.split('\n').length}
              value={noteContent}
              onChange={handleTextareaChange}
              placeholder='Type your note here'
              className='min-h-screen w-full mt-5 sm:p-5 p-3 rounded-xl bg-transparent border-4 focus:outline-none border-gray-200 dark:border-slate-600'
            />
          </div>

        </div>
        :
        <PleaseWait />
      }
    </div>
  )
}

export default page