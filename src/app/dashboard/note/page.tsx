"use client"
import React, {useEffect} from 'react'
import type { RootState } from '../../GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux'
import { CardNote, Header, SearchForm } from '@/components'
import { updateNote } from '@/app/GlobalRedux/Features/note/noteSlice';

const page = () => {

    return (
        <div>
            <Header page="Dashboard" item="Notes" />
            <SearchForm />

            <CardNote />
        </div>
    )
}

export default page