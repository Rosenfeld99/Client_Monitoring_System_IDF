import React from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri';
import * as xlsx from "xlsx"

function DownloadExcel() {


    const getExcelFormat=(report)=>{
      return  {
            מיקום: report.location,
            תוכן: report.content,
            תאריך: report.date,
            שעת_התחלה: report.startTime,
            שעת_סיום: report.endTime,
            הושלם: report. isComplited ? "כן" : "לא",
        }
    }

    const handleExcelPrint = () => {
        const storageData = JSON?.parse(localStorage?.getItem("WAVES_SYSTEM") || "{}");
    
        const wb = xlsx.utils.book_new();
    
        // Convert historyData to the required format
        const historyData = storageData?.history?.map(({ id, ...rest }) => getExcelFormat(rest));
        const wsHistory = xlsx.utils.json_to_sheet(historyData || []);
        xlsx.utils.book_append_sheet(wb, wsHistory, 'היסטורייה ');
    
        // Convert grupHistory to the required format
        const grupHistory = storageData?.reportsClass[0]?.reportsList?.map(({ id, ...rest }) => getExcelFormat(rest)) || [];
        if (storageData.reportsClass[0]?.lastReport) {
            grupHistory.push(getExcelFormat(storageData.reportsClass[0].lastReport));
        }
        const wsGrupHistory = xlsx.utils.json_to_sheet(grupHistory);
        xlsx.utils.book_append_sheet(wb, wsGrupHistory, 'היסטוריית מחלקה');
    
        // Convert testsHistory to the required format
        const testsHistory = storageData?.userTests?.flatMap((user) =>
            user.reportsList.map(({ id, ...rest }) => getExcelFormat(rest))
        ) || [];
        const wsTestsHistory = xlsx.utils.json_to_sheet(testsHistory);
        xlsx.utils.book_append_sheet(wb, wsTestsHistory, 'חיילי מדגם');
    
        // Write the workbook to a file
        xlsx.writeFile(wb, 'waves.xlsx');
    };
    
    return (
        <button className=' bg-[#1b834c] border py-1 flex flex-row-reverse active:scale-75 duration-100 items-center justify-center gap-1 rounded-md px-3 text-sm'
            onClick={handleExcelPrint}
        >
            <RiFileExcel2Fill className='text-lg' /> הורדה ל
        </button>
    )
}
export default DownloadExcel