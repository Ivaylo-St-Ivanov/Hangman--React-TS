import React, { useContext, useState, useEffect } from 'react';
import { FaInfo } from 'react-icons/fa';
import { GrInfo } from 'react-icons/gr';

import { ThemeContext } from '../../context/ThemeContext';

import InfoText from './InfoText';
import HintText from './HintText';
import './Info.scss';

interface InfoProps {
    isWinner?: boolean
    isLoser?: boolean
    wordToGuess: string
}

const Info: React.FC<InfoProps> = ({ isWinner, isLoser, wordToGuess }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [isRuleClick, setIsRuleClick] = useState<boolean>(false);
    const [isHintClick, setIsHintClick] = useState<boolean>(false);
    const localStorageGuessedWords = localStorage.getItem('score');
    const localStorageBestResult = localStorage.getItem('bestResult');
    const [score, setScore] = useState<string[]>(localStorageGuessedWords ? JSON.parse(localStorageGuessedWords) : []);
    const [guessedWords, setGuessedWords] = useState<number>(score.length);
    const [bestResult, setBestResult] = useState<number>(localStorageBestResult ? JSON.parse(localStorageBestResult) : 0);

    useEffect(() => {
        localStorage.setItem('score', JSON.stringify(score));
    }, [score]);

    useEffect(() => {
        if (isWinner && !score.includes(wordToGuess)) {
            const res = score.length;

            setScore(state => [...state, wordToGuess]);
            setGuessedWords(res + 1);
        } else if (isLoser && score.length > 0) {
            if (guessedWords > bestResult) {
                setBestResult(guessedWords);
                localStorage.setItem('bestResult', JSON.stringify(guessedWords));
            }

            setScore([]);
            setGuessedWords(0);
            localStorage.removeItem('score');
        }
    }, [isWinner, isLoser, score, wordToGuess, guessedWords, bestResult]);

    const onRulesClick = () => {
        setIsHintClick(false);
        setIsRuleClick(state => !state);
    };

    const onHintsClick = () => {
        setIsRuleClick(false);
        setIsHintClick(state => !state);
    };

    return (
        <div className="info">
            <div className={isDarkTheme ? 'info__icons info__icons__dark' : 'info__icons'}>
                <span className="info__icons__rules">
                    <FaInfo onClick={onRulesClick} />
                    <InfoText isRuleClick={isRuleClick} />
                </span>
                <span onClick={onHintsClick} className="info__icons__hint">
                    <GrInfo />
                    <HintText isHintClick={isHintClick} />
                </span>
            </div>

            <div className={isDarkTheme ? 'info__result info__result__dark' : 'info__result'}>
                <span>Guessed words: {guessedWords}</span>
                <span>Best result: {bestResult}</span>
            </div>
        </div>
    );
};

export default Info;