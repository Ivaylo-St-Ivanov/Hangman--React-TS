import React from 'react';

import './HangmanWord.scss';

interface HangmanWordProps { }

const HangmanWord: React.FC<HangmanWordProps> = () => {

    const word = 'test';
    const guessedLetters = ['t'];

    return (
        <div className="word">
            {word.split('').map((letter, index) => (
                <span key={index} className="word__letter">
                    <span className="word__letter" style={{
                        visibility:
                            guessedLetters.includes(letter) ? 'visible' : 'hidden'
                    }}>{letter}</span>
                </span>
            ))}
        </div>
    );
};

export default HangmanWord;