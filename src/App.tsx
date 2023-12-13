import { useState, useEffect } from 'react';

import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard/HangmanKeyboard';

import words from './utils/wordsList.json';
import './global-styles/App.scss';

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length)];
        setWordToGuess(word);
    }, []);

    return (
        <div className="container">
            <main className="container__game">
                <p>Lose Win</p>
                <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
                <div className="container__game__keyboard">
                    <HangmanKeyboard />
                </div>
            </main>
        </div>
    );
}

export default App;
