import React, { ReactNode, createContext, useState } from 'react';

export const ThemeContext = createContext({
    isDarkTheme: false,
    setIsDarkTheme: () => {}
});

interface ThemeProviderProp {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProp> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

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