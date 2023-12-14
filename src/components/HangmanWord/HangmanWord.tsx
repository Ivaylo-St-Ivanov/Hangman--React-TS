import React from 'react';

import './HangmanWord.scss';

interface HangmanWordProps {
    guessedLetters: string[],
    wordToGuess: string,
    reveal?: boolean
}

const HangmanWord: React.FC<HangmanWordProps> = ({ guessedLetters, wordToGuess, reveal = false }) => {

    return (
        <div className="word">
            {wordToGuess.split('').map((letter, index) => (
                <span key={index} className="word__letter">
                    <span className="word__letter" style={{
                        visibility:
                            guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
                        color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black'
                    }}>{letter}</span>
                </span>
            ))}
        </div>
    );
};

export default HangmanWord;