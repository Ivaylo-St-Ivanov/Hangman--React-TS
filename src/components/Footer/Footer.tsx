import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';

import './Footer.scss';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer>
            <span><FaRegCopyright /> IVo</span>
        </footer>
    );
};

export default Footer;