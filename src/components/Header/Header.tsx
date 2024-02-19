import React, { useContext, useState } from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiSun } from 'react-icons/gi';

import { ThemeContext } from '../../context/ThemeContext';
import './Header.scss';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const { isDarkTheme, setIsDarkTheme} = useContext(ThemeContext);
    const [hovered, setHovered] = useState<boolean>(false);

    const setDarkTheme = () => {
        setIsDarkTheme();
    };

    return (
        <header className={isDarkTheme ? 'header header-dark' : 'header'}>
            <h1 className="header__title">Hangman Game</h1>
            <div 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={setDarkTheme} className="header__theme-btn"
            >
                {!isDarkTheme && <BsMoonStarsFill className={hovered ? 'moon' : null} />}
                {isDarkTheme && <GiSun className={hovered ? 'sun' : null} />}
            </div>
        </header>
    );
};

export default Header;