import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CustomSelect = ({ options, placeholder, labelText, setState, layer, keyToUpdate, defaultValue }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || "");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setState(option, keyToUpdate)
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative w-64 ${layer}`} ref={selectRef}>
            <label
                className={`absolute right-2 bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content px-2 transition-all duration-200 ${isOpen || selectedOption ? '-top-2.5 text-xs text-gray-400' : 'top-2.5 text-base text-gray-500'}`}
                style={{ pointerEvents: 'none' }}
            >
                {labelText}
            </label>
            <div
                tabIndex={0}
                className={`border border-gray-300 ${isOpen && "border-blue-300 border-2"} rounded-md p-2 cursor-pointer bg-light_primary dark:bg-dark_primary text-light_primary_content dark:text-dark_primary_content ${isOpen && "border-2 border-blue-400"}`}
                onClick={toggleDropdown}
            >
                {selectedOption || placeholder}
                <span className="float-left flex items-center text-3xl justify-center">
                    {isOpen ? (
                        <FiChevronUp />
                    ) : (
                        <FiChevronDown />
                    )}
                </span>
            </div>
            {isOpen && (
                <ul className="absolute mt-1 w-full border border-dark_accent_content rounded-md bg-light_primary dark:bg-dark_primary z-10">
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            className={`p-2 px-5 cursor-pointer hover:bg-gray-200 ${index !== options.length - 1 && "border-b-[1px] border-dark_accent_content"}`}
                            onClick={() => handleOptionClick(option?.name)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
