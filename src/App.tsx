import { useState, useEffect, KeyboardEvent, useCallback } from 'react';

import Header from './components/Header/Header';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard/HangmanKeyboard';
import Footer from './components/Footer/Footer';

import words from './utils/wordsList.json';
import './global-styles/App.scss';
import { ThemeProvider } from './context/ThemeContext';

const getWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

    useEffect(() => {
        const word = getWord();
        setWordToGuess(word);
    }, []);

    const addGuessedLetter = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isWinner || isLoser) {
                return;
            }

            setGuessedLetters(state => [...state, letter]);
        },
        [guessedLetters, isWinner, isLoser]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key.match(/^[a-z]$/)) {
                e.preventDefault();
                addGuessedLetter(key);
            } else if (key == 'Enter') {
                e.preventDefault();
                setGuessedLetters([]);
                setWordToGuess(getWord());
            }
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [addGuessedLetter, guessedLetters]);

    return (
        <ThemeProvider>
            <div className="container">
                <Header />
                <main className="container__game">
                    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                    <p>
                        {isWinner && 'Winner! - Refresh to try again'}
                        {isLoser && 'Nice Try - Refresh to try again'}
                    </p>
                    <HangmanWord
                        guessedLetters={guessedLetters}
                        wordToGuess={wordToGuess}
                        reveal={isLoser}
                    />
                    <div className="container__game__keyboard">
                        <HangmanKeyboard
                            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                            inactiveLetters={incorrectLetters}
                            addGuessedLetter={addGuessedLetter}
                            disabled={isWinner || isLoser}
                        />
                    </div>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
