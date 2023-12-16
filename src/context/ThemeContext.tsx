import React, { ReactNode, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
    isDarkTheme: false,
    setIsDarkTheme: () => {}
});

interface ThemeProviderProp {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProp> = ({ children }) => {
    const storedTheme = localStorage.getItem('isDarkTheme');
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(storedTheme ? JSON.parse(storedTheme) : false);

    useEffect(() => {
        localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
    }, [isDarkTheme]);

    const setDarkTheme = () => {
        setIsDarkTheme(state => !state);
    };

    const ctx = {
        setIsDarkTheme: setDarkTheme,
        isDarkTheme
    };

    return (
        <>
            <ThemeContext.Provider value={ctx}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};