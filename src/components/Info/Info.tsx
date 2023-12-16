import React from 'react';
import { FaInfo } from 'react-icons/fa';
import { GrInfo } from 'react-icons/gr';

import './Info.scss';

interface InfoProps { }

const Info: React.FC<InfoProps> = () => {
    return (
        <div className="info">
            <div className="info__icons">
                <FaInfo />
                <GrInfo />
            </div>

            <div className="info__result">
                <span>Guessed words: 0</span>
                <span>Best result: 9</span>
            </div>
        </div>
    );
};

export default Info;