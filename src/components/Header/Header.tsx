import React, { useContext } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiSun } from 'react-icons/gi';

import { ThemeContext } from '../../context/ThemeContext';
import './Header.scss';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const { isDarkTheme, setIsDarkTheme} = useContext(ThemeContext);

    const setDarkTheme = () => {
        setIsDarkTheme();
    };

    return (
        <header className={isDarkTheme ? 'header header-dark' : 'header'}>
            <h1 className="header__title">Hangman Game</h1>
            <div onClick={setDarkTheme} className="header__theme-btn">
                {!isDarkTheme && <BsMoonStarsFill className="header__theme-btn__moon" />}
                {isDarkTheme && <GiSun className="header__theme-btn__sun" />}
            </div>
        </header>
    );
};

export default Header;