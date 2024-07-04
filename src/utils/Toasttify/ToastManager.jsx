// ToastManager.js
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

const ToastContext = createContext();

const toastColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
};

const Toast = ({ type, message, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 3.33, 0)); // Update progress every 100ms for 3s timeout
        }, 100);
        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);

    return (
        <div className={`relative px-4 py-2 rounded-md shadow-md text-white ${toastColors[type]} transition-opacity duration-300`}>
            {message}
            <div className="absolute bottom-0 left-0 h-1 bg-white mb-1" style={{ width: `${progress}%` }} />
        </div>
    );
};

const ToastManager = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, type, message }]);
        setTimeout(() => setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id)), 3000);
    }, []);

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <div className="fixed top-20 right-4 space-y-2 shadow-md dark:shadow-[#000] rounded-md">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toast.id))}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

export default ToastManager;


// use
{/* <div>
    <button onClick={() => showToast('success', 'הצלחה! הפעולה בוצעה בהצלחה')}>Show Success Toast</button>
    <button onClick={() => showToast('error', 'שגיאה! משהו השתבש')}>Show Error Toast</button>
    <button onClick={() => showToast('warning', 'אזהרה! בדוק שוב את הנתונים')}>Show Warning Toast</button>
</div> */}