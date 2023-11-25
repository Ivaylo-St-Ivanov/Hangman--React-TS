import { useState, useEffect } from 'react';

import HangmanDrawing from './components/HangmanDrawing';
import HangmanWord from './components/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard';

import words from './wordsList.json';

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    // const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    useEffect(() => {
        const word = words[Math.floor(Math.random() * words.length)];
        setWordToGuess(word);
    }, []);

    console.log(wordToGuess);

    return (
        <div
            style={{
                maxWidth: '50rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                margin: '0 auto',
                alignItems: 'center'
            }}>

            <div style={{ fontSize: '2rem', textAlign: 'center' }}>Lose Win</div>
            <HangmanDrawing />
            <HangmanWord />
            <HangmanKeyboard />

        </div>
    );
}

export default App;
