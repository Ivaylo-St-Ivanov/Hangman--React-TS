import React from 'react';

import { keys } from '../../utils/keys';

import './HangmanKeyboard.scss';

interface HangmanKeyboardProps { }

const HangmanKeyboard: React.FC<HangmanKeyboardProps> = () => {
    return (
        <div className="keyboard">
            {keys.map(key => (
                <button key={key} className="keyboard__btn">{key}</button>
            ))}
        </div>
    );
};

export default HangmanKeyboard;