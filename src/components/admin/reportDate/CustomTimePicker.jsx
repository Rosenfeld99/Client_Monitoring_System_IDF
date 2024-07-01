import React, { useState, useRef } from 'react';
import './CustomTimePicker.css';
import { FaHourglassEnd, FaHourglassStart, FaLightbulb } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InfoTooltip from '../../InfoTooltip/InfoTooltip';


const CustomTimePicker = ({ title, btnInnerTime }) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const minutesRef = useRef(null);
    const navigation = useNavigate()
    const [searchParams] = useSearchParams()



    const handleHourChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value < 24) {
            setHours(value);
            if (value.length === 2) {
                minutesRef.current.focus();
            }
        }
    };

    const handleMinuteChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value < 60) {
            setMinutes(value);
        }
    };

    const handleGetCurrentTime = () => {
        const now = new Date();
        setHours(now.getHours().toString().padStart(2, '0'));
        setMinutes(now.getMinutes().toString().padStart(2, '0'));
        setIsFlipped(false);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleChooseAutomaticEndTime = () => {
        setMinutes('')
        setHours('')
        const params = new URLSearchParams({
            //     s: searchParams.get('s'),
            //     location: searchParams.get('location'),
            //     startTime: searchParams.get('startTime'),
            endTime: "אוטומטי"
        }).toString();
        navigation(`/manageDate?${params}`);
        setIsFlipped(false);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <div className="front overflow-hidden">
                    <button
                        className="gradient-bg-dark gradient-bg-light z-40 text-white px-4 py-2 rounded"
                        onClick={handleFlip}
                    >
                        {title}
                    </button>
                    {btnInnerTime == "אוטומטי" ? <FaHourglassEnd className=' text-dark_accent_content opacity-5 absolute text-sm mx-auto w-full my-auto h-full top-0 right-0 rotate-12 z-20' /> : <FaHourglassStart className=' text-dark_accent_content opacity-5 absolute text-sm mx-auto w-full my-auto h-full top-0 right-0 rotate-12 z-20' />}
                    <div className=" absolute bottom-3 text-xl flex items-center font-semibold">
                        {minutes && hours && minutes} {minutes && hours && <span className="p-1">:</span>} {minutes && hours && hours}
                        {title == "שעת סיום" && searchParams.get('endTime') && !hours && !minutes && <span className="p-1">{searchParams.get('endTime')}</span>}
                    </div>
                </div>
                <div className="back relative">
                    {btnInnerTime == "אוטומטי" && <InfoTooltip positionMsg={btnInnerTime == "אוטומטי" ? "right" : "left"} title={"מה זה אוטומטי? "} message={" אפשרות של התחלת דיווח וסיום הדיווח בכל זמן נתון לדוגמא: התחלתם מטווחים ואתם לא יודעים כמה זמן זה יקח , אפשר להתחיל את הדיווח וללחוץ על 'סיום דיווח' כשמסתיים "}>
                        <FaLightbulb className=' text-warning text-lg absolute top-0 left-0 m-2' />
                    </InfoTooltip>}
                    <div className="mt-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="time">
                            בחר זמן
                        </label>
                        <div className="flex flex-row-reverse ">
                            <input
                                type="number"
                                value={hours}
                                onChange={handleHourChange}
                                placeholder="שעות"
                                className="mr-1 p-1 outline-none bg-transparent w-full border border-gray-300 rounded-r-lg"
                                min="0"
                                max="23"
                                maxLength="2"
                            />
                            <span className="p-1">:</span>
                            <input
                                ref={minutesRef}
                                type="number"
                                value={minutes}
                                onChange={handleMinuteChange}
                                placeholder="דקות"
                                className="ml-1 p-1 outline-none bg-transparent w-full border border-gray-300 rounded-l-lg"
                                min="0"
                                max="59"
                                maxLength="2"
                            />
                        </div>
                        <div className="my-4">
                            <p>
                                זמן שנבחר: {hours.padStart(2, '0')}:{minutes.padStart(2, '0')}
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full -mt-2">
                            <button
                                className="bg-gray-500 text-white w-full rounded px-2 py-1"
                                onClick={handleFlip}
                            >
                                סגור
                            </button>
                            <button
                                className=" w-full rounded bg-light_accent px-2 py-1 text-nowrap"
                                onClick={btnInnerTime == "אוטומטי" ? handleChooseAutomaticEndTime : handleGetCurrentTime}
                            >
                                {btnInnerTime}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTimePicker;
