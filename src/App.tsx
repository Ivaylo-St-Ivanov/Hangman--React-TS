import { useState, useEffect } from 'react';

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
        <>
            <p>Works</p>
        </>
    );
}

export default App;
