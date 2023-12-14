import React from 'react';
import { BsMoonStarsFill } from 'react-icons/bs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GiSun } from 'react-icons/gi';

import './Header.scss';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="header">
            <h1 className="header__title">Hangman Game</h1>
            <div className="header__theme-btn">
                <BsMoonStarsFill className="header__theme-btn__moon" />
                {/* <GiSun className="header__theme-btn__sun" /> */}
            </div>
        </header>
    );
};

export default Header;