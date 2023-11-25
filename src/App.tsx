import { useState, useEffect } from 'react';

import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard';

import words from './wordsList.json';
import './global-styles/App.scss';

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    // const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length)];
        setWordToGuess(word);
    }, []);

    console.log(wordToGuess);

    return (
        <div className="container">
            <main className="container__game">
                <p>Lose Win</p>
                <HangmanDrawing />
                <HangmanWord />
                <HangmanKeyboard />
            </main>
        </div>
    );
}

export default App;
