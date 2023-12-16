import { useState, useEffect, KeyboardEvent, useCallback, useContext } from 'react';

import { ThemeContext } from './context/ThemeContext';

import Header from './components/Header/Header';
import Info from './components/Info/Info';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard/HangmanKeyboard';
import Footer from './components/Footer/Footer';

import words from './utils/wordsList.json';
import './global-styles/App.scss';

const getWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord());
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const { isDarkTheme } = useContext(ThemeContext);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

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

    const refresh = () => {
        setGuessedLetters([]);
        setWordToGuess(getWord());
    };

    return (
        <div className={isDarkTheme ? 'container container-dark' : 'container'}>
            <Header />

            <main className="container__main">
                <Info />

                <div className="container__main__game">
                    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
                    <p>
                        {isWinner && 'Winner! - click or press \'Enter\' to try again'}
                        {isLoser && 'Nice Try - click or press \'Enter\' to try again'}
                    </p>
                    <HangmanWord
                        guessedLetters={guessedLetters}
                        wordToGuess={wordToGuess}
                        reveal={isLoser}
                    />
                    <div className="container__main__game__keyboard">
                        <HangmanKeyboard
                            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
                            inactiveLetters={incorrectLetters}
                            addGuessedLetter={addGuessedLetter}
                            disabled={isWinner || isLoser}
                            refresh={refresh}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
