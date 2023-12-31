import { useState, useEffect, useCallback, useContext } from 'react';

import { ThemeContext } from './context/ThemeContext';
import { getWord } from './api/wordGenerator';

import Header from './components/Header/Header';
import Info from './components/Info/Info';
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing';
import HangmanWord from './components/HangmanWord/HangmanWord';
import HangmanKeyboard from './components/HangmanKeyboard/HangmanKeyboard';
import Footer from './components/Footer/Footer';
import MessageModal from './components/MessageModal/MessageModal';

import './global-styles/App.scss';

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const localStorageWordLength = localStorage.getItem('wordLength');
    const [wordLength, setWordLength] = useState<number>(localStorageWordLength ? JSON.parse(localStorageWordLength) : 0);
    const localStorageFirstLetter = localStorage.getItem('firstLetter');
    const [firstLetter, setFirstLetter] = useState<string>(localStorageFirstLetter ? JSON.parse(localStorageFirstLetter) : '');
    const localStorageIsUsedTopWords = localStorage.getItem('isUsedTopWords');
    const [isUseTopWords, setIsUseTopWords] = useState<boolean>(localStorageIsUsedTopWords ? JSON.parse(localStorageIsUsedTopWords) : false);
    
    const [isShownModal, setIsShownModal] = useState<boolean>(false);
    const [isClickSettingsOnMessageModal, setIsClickSettingsOnMessageModal] = useState<boolean>(false);
    const { isDarkTheme } = useContext(ThemeContext);

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter));

    useEffect(() => {
        const fetchWord = async () => {
            const word = await getWord(wordLength, firstLetter, isUseTopWords);

            if (word != undefined) {
                setWordToGuess(word);
            } else {
                setIsShownModal(true);
            }
        };

        fetchWord();
    }, [wordLength, firstLetter, isUseTopWords]);

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = async (e: any) => {                    // (e: KeyboardEvent)
            const key = e.key;

            if (key.match(/^[a-z]$/)) {
                e.preventDefault();
                addGuessedLetter(key);
            } else if (key == 'Enter') {
                e.preventDefault();
                setGuessedLetters([]);
                const word = await getWord(wordLength, firstLetter, isUseTopWords);
                
                if (word != undefined) {
                    setWordToGuess(word);
                } else {
                    setIsShownModal(true);
                }
            }
        };

        document.addEventListener('keypress', handler);

        return () => {
            document.removeEventListener('keypress', handler);
        };
    }, [addGuessedLetter, guessedLetters, wordLength, firstLetter, isUseTopWords]);

    const refresh = async () => {
        setGuessedLetters([]);
        const word = await getWord(wordLength, firstLetter, isUseTopWords);
        
        if (word != undefined) {
            setWordToGuess(word);
        } else {
            setIsShownModal(true);
        }
    };

    const handleWordLengthChange = (newWordLength: number) => {
        setWordLength(newWordLength);

        localStorage.setItem('wordLength', JSON.stringify(newWordLength));
    };

    const handleFirstLetterChange = (letter: string) => {
        setFirstLetter(letter);

        localStorage.setItem('firstLetter', JSON.stringify(letter));
    };

    const handleUseTopWordsChange = () => {
        setIsUseTopWords(state => !state);

        localStorage.setItem('isUsedTopWords', JSON.stringify(!isUseTopWords));
    };

    const onClickSettingsOnMessageModal = () => {
        setIsShownModal(false);
        setIsClickSettingsOnMessageModal(state => !state);
    };

    return (
        <div className={isDarkTheme ? 'container container-dark' : 'container'}>
            <Header />

            <main className="container__main">
                <Info
                    isWinner={isWinner}
                    isLoser={isLoser}
                    wordToGuess={wordToGuess}
                    onWordLengthChange={handleWordLengthChange}
                    onFirstLetterChange={handleFirstLetterChange}
                    onIsUseTopWordsChange={handleUseTopWordsChange}
                    initialFirstLetter={firstLetter}
                    isClickSettingsOnMessageModal={isClickSettingsOnMessageModal}
                />

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

            {isShownModal && <MessageModal onClickSettingsOnMessageModal={onClickSettingsOnMessageModal} />}
        </div>
    );
}

export default App;
