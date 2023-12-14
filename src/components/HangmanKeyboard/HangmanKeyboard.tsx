import React from 'react';

import { keys } from '../../utils/keys';

import './HangmanKeyboard.scss';

interface HangmanKeyboardProps {
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter: string) => void
}

const HangmanKeyboard: React.FC<HangmanKeyboardProps> = ({
    activeLetters, inactiveLetters, addGuessedLetter
}) => {
    return (
        <div className="keyboard">
            {keys.map(key => {
                const isActive = activeLetters.includes(key);
                const isInactive = inactiveLetters.includes(key);
                return (
                    <button 
                        onClick={() => addGuessedLetter(key)} 
                        key={key} 
                        className={`keyboard__btn ${isActive ? 'keyboard__btn__active' : ''} ${isInactive ? 'keyboard__btn__inactive' : ''}`}
                        disabled={isActive || isInactive}
                    >{key}</button>
                );
            })}
        </div>
    );
};

export default HangmanKeyboard;