import React, { useContext, useState } from 'react';
import { FaInfo } from 'react-icons/fa';
import { GrInfo } from 'react-icons/gr';

import { ThemeContext } from '../../context/ThemeContext';

import InfoText from './InfoText';
import HintText from './hintText';
import './Info.scss';

interface InfoProps { }

const Info: React.FC<InfoProps> = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [isRuleClick, setIsRuleClick] = useState<boolean>(false);
    const [isHintClick, setIsHintClick] = useState<boolean>(false);

    const onRulesClick = () => {
        setIsHintClick(false);
        setIsRuleClick(state => !state);
    };

    const onHintsClick = () => {
        setIsRuleClick(false);
        setIsHintClick(state => !state);
    };

    return (
        <div className="info">
            <div className={isDarkTheme ? 'info__icons info__icons__dark' : 'info__icons'}>
                <span className="info__icons__rules">
                    <FaInfo onClick={onRulesClick} />
                    <InfoText isRuleClick={isRuleClick} />
                </span>
                <span onClick={onHintsClick} className="info__icons__hint">
                    <GrInfo />
                    <HintText isHintClick={isHintClick} />
                </span>
            </div>

            <div className={isDarkTheme ? 'info__result info__result__dark' : 'info__result'}>
                <span>Guessed words: 0</span>
                <span>Best result: 9</span>
            </div>
        </div>
    );
};

export default Info;