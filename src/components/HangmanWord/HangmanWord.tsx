import React from 'react';

import './HangmanWord.scss';

interface HangmanWordProps {
    guessedLetters: string[],
    wordToGuess: string
}

const HangmanWord: React.FC<HangmanWordProps> = ({ guessedLetters, wordToGuess }) => {

    return (
        <div className="word">
            {wordToGuess.split('').map((letter, index) => (
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