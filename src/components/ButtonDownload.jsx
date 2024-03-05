import React from 'react';
import downloadAsExcel from '../utils/downloadAsExcel';
import { MdOutlineSimCardDownload } from 'react-icons/md';

const ButtonDownload = ({ data, name, col1, col2 }) => {

    let dataSlice;
    if (data) {
        dataSlice = data.map((item) => {
            const selectedAttributes = Object.keys(item).slice(col1, col2);
            const newObj = {};
            selectedAttributes.forEach((attribute) => {
                newObj[attribute] = item[attribute];
            });
            return newObj;
        });
    }
    return (
        <button onClick={() => downloadAsExcel(dataSlice, name)} className="text-black hover:bg-slate-300 dark:text-white bg-white dark:bg-slate-900 border-none dark:hover:bg-slate-600 rounded-full p-2 flex items-center">
            <MdOutlineSimCardDownload size={22} />
        </button>
    )
}

export default ButtonDownload