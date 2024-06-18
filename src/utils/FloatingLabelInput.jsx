import React, { useState } from 'react';
import '../App.css';

const FloatingLabelInput = ({placeholder,label,state,setState}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative mt-5">
      <label
        className={`absolute right-2 bg-white px-2 transition-all duration-200 ${isFocused || state ? '-top-2.5 text-xs text-gray-400 animate__bounceInUp' : 'top-2.5 text-base text-gray-500'}`}
      >
        {label}
      </label>
      <input
        className="justify-center px-4 py-2 bg-white rounded-lg w-full border border-solid border-neutral-200 text-ellipsis"
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? '' : placeholder}
      />
    </div>
  );
};

export default FloatingLabelInput;
