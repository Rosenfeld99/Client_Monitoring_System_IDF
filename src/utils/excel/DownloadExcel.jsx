import React from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri';
import * as xlsx from "xlsx"

function DownloadExcel() {
    const handelExelPrint = () => {
        const storgeData = JSON?.parse(localStorage?.getItem("WAVES_SYSTEM") || "")
        const wb = xlsx.utils.book_new();
        const translatedData = storgeData.history?.map(({ id, ...rest }) => ({
            מיקום: rest.location,
            תוכן: rest.content,
            תאריך: rest.date,
            שעת_התחלה: rest.startTime,
            שעת_סיום: rest.endTime,
            הושלם: rest.isCompited ? "כן" : "לא",
        }));
        const ws = xlsx.utils.json_to_sheet(translatedData || "");
        // Add the worksheet to the workbook
        xlsx.utils.book_append_sheet(wb, ws, 'Events');
        // Write the workbook to a file
        xlsx.writeFile(wb, 'events.xlsx');
    }
    return (
        <button className=' bg-[#1b834c] border py-1 flex flex-row-reverse active:scale-75 duration-100 items-center justify-center gap-1 rounded-md px-3 text-sm'
            onClick={handelExelPrint}
        >
            <RiFileExcel2Fill className='text-lg' /> הורדה ל
        </button>
    )
}
export default DownloadExcel