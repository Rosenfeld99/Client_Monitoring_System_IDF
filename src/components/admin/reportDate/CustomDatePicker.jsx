import React, { useState, useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const hebrewDaysOfWeek = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const hebrewMonths = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

const formatDateToHebrew = (date) => {
    const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayOfWeek = hebrewDays[date.getDay()];
    const day = date.getDate();
    const month = hebrewMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day} ב${month} ${year}`;
};

const CustomDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() => {
        generateCalendar(selectedDate.getMonth(), selectedDate.getFullYear());
    }, [selectedDate]);

    const generateCalendar = (month, year) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const tempDaysArray = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            tempDaysArray.push('');
        }

        for (let i = 1; i <= daysInMonth; i++) {
            tempDaysArray.push(i);
        }

        setDaysArray(tempDaysArray);
    };

    const handleDateClick = (day) => {
        if (day) {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            setSelectedDate(newDate);
        }
    };

    const handlePrevMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    console.log(selectedDate);
    return (
        <div dir='rtl' className="flex justify-center items-center border rounded-lg w-80">
            <div className="p-4 ">
                <div className="mb-4 border-b">
                    <label className=" flex justify-between text-sm font-bold mb-2">
                        <span>תאריך נבחר</span> <span>{formatDateToHebrew(selectedDate)}</span>
                    </label>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold">
                        {hebrewMonths[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </span>
                    <div className=" flex flex-row-reverse items-center gap-5 text-light_neutral dark:text-dark_accent_content">
                        <button onClick={handleNextMonth} className=" rounded-full w-10 h-10 flex items-center justify-center border-2 border-gray-600 text-3xl ">
                            {/* חודש הבא */}
                            <BiChevronLeft />
                        </button>
                        <button onClick={handlePrevMonth} className=" rounded-full w-10 h-10 flex items-center justify-center border-2 border-gray-600 text-3xl ">
                            {/* חודש קודם */}
                            <BiChevronRight />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {hebrewDaysOfWeek.map((day) => (
                        <div key={day} className="text-center font-bold">
                            {day}
                        </div>
                    ))}
                    {daysArray.map((day, index) => (
                        <div
                            key={index}
                            className={`text-center w-10 h-10 flex items-center outline-none justify-center cursor-pointer ${day === selectedDate.getDate() ? 'bg-light_accent text-white rounded-full' : 'hover:bg-blue-200 text-light_neutral rounded-full dark:text-dark_accent_content'
                                }`}
                            onClick={() => handleDateClick(day)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;
