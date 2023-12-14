import { useState, useEffect, KeyboardEvent, useCallback } from 'react';

import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard/HangmanKeyboard';

import words from './utils/wordsList.json';
import './global-styles/App.scss';

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length)];
        setWordToGuess(word);
    }, []);

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter)) {
                return;
            }

            setGuessedLetters(state => [...state, letter]);
        },
        [guessedLetters]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key.match(/^[a-z]$/)) {
                return;
            }

            e.preventDefault();
            addGuessedLetter(key);
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [addGuessedLetter, guessedLetters]);

    return (
        <div className="container">
            <main className="container__game">
                <p>Lose Win</p>
                <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
                <div className="container__game__keyboard">
                    <HangmanKeyboard
                        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                        inactiveLetters={incorrectLetters}
                        addGuessedLetter={addGuessedLetter}
                    />
                </div>
            </main>
        </div>
    );
}

export default App;
