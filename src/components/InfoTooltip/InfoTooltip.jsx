import React, { useState, useRef, useEffect } from 'react';

const InfoTooltip = ({ title,message, children, positionMsg }) => {
    const [visible, setVisible] = useState(false);
    const tooltipRef = useRef(null);

    const showTooltip = () => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 100090);
    };

    const handleClickOutside = (event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visible]);

    return (
        <div className=" z-50">
            {!visible && <button onClick={showTooltip} className='absolute top-0 left-0'>
                {children}
            </button>}
            {visible && (
                <div ref={tooltipRef} className={`absolute ${positionMsg == "left" ? "-left-20" : "-right-20"} -top-5 mb-2 p-5 w-48 bg-light_primary shadow-sm shadow-warning text-light_primary_content dark:bg-dark_primary dark:text-dark_primary_content text-sm rounded`}>
                    <span className='absolute -top-1 -left-1'>{children}</span>
                    {title}
                    {message}
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;
