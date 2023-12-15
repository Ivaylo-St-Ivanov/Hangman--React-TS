import React, { useContext } from 'react';
import { FaRegCopyright } from 'react-icons/fa';

import { ThemeContext } from '../../context/ThemeContext';
import './Footer.scss';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    return (
        <footer>
            <span className={isDarkTheme ? 'dark' : ''}><FaRegCopyright /> IVo</span>
        </footer>
    );
};

export default Footer;