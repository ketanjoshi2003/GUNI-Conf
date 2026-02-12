import React, { createContext, useContext, useState, useEffect } from 'react';

const YearContext = createContext();

export const YearProvider = ({ children }) => {
    // Default to 2026 (current edition)
    const [selectedYear, setSelectedYear] = useState(2026);

    useEffect(() => {
        const storedYear = localStorage.getItem('selectedYear');
        if (storedYear) {
            setSelectedYear(parseInt(storedYear));
        }
    }, []);

    const changeYear = (year) => {
        const yearInt = parseInt(year);
        setSelectedYear(yearInt);
        localStorage.setItem('selectedYear', yearInt);

        // Optional: specific logic when year changes (e.g. tracking)
        console.log(`Conference Edition switched to ${yearInt}`);
    };

    return (
        <YearContext.Provider value={{ selectedYear, changeYear }}>
            {children}
        </YearContext.Provider>
    );
};

export const useYear = () => {
    const context = useContext(YearContext);
    if (!context) {
        throw new Error('useYear must be used within a YearProvider');
    }
    return context;
};
