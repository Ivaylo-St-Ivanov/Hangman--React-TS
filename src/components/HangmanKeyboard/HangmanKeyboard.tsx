import React, { useContext } from 'react';

import { keys } from '../../utils/keys';
import { ThemeContext } from '../../context/ThemeContext';

import './HangmanKeyboard.scss';

interface HangmanKeyboardProps {
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter: string) => void,
    disabled?: boolean,
    refresh: () => void
}

const HangmanKeyboard: React.FC<HangmanKeyboardProps> = ({
    activeLetters, inactiveLetters, addGuessedLetter, disabled = false, refresh
}) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div className="keyboard">
            {keys.map(key => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button 
                        onClick={() => addGuessedLetter(key)} 
                        key={key} 
                        className={`keyboard__btn ${isActive ? 'keyboard__btn__active' : ''} ${isInactive ? 'keyboard__btn__inactive' : ''} ${isDarkTheme ? 'keyboard__btn-dark' : ''} ${isDarkTheme && isActive ? 'keyboard__btn-dark__active' : ''}`}
                        disabled={isActive || isInactive || disabled}
                    >{key}</button>
                );
            })}
            <button onClick={refresh} className="keyboard__refresh-btn" >Enter</button>
        </div>
    );
};

export default HangmanKeyboard;