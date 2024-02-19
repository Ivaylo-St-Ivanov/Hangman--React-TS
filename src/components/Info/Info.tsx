import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaInfo } from 'react-icons/fa';
import { GrInfo } from 'react-icons/gr';
import { MdOutlineSettingsSuggest } from 'react-icons/md';

import { ThemeContext } from '../../context/ThemeContext';
import { mouseEvent } from '../../utils/utils';

import InfoText from './InfoText';
import HintText from './HintText';
import Settings from './Settings';
import './Info.scss';

interface InfoProps {
    isWinner?: boolean
    isLoser?: boolean
    wordToGuess: string
    onWordLengthChange: (wordLength: number) => void
    onFirstLetterChange: (firstLetter: string) => void
    onIsUseTopWordsChange: () => void
    initialFirstLetter: string
    isClickSettingsOnMessageModal: boolean
}

const Info: React.FC<InfoProps> = ({ isWinner, isLoser, wordToGuess, onWordLengthChange, onFirstLetterChange, onIsUseTopWordsChange, initialFirstLetter, isClickSettingsOnMessageModal }) => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [isRuleClick, setIsRuleClick] = useState<boolean>(false);
    const [isHintClick, setIsHintClick] = useState<boolean>(false);
    const [isSettingsClick, setIsSettingsClick] = useState<boolean>(false);
    const popupRef = useRef<HTMLElement>(null);
    const localStorageGuessedWords = localStorage.getItem('score');
    const localStorageBestResult = localStorage.getItem('bestResult');
    const [score, setScore] = useState<string[]>(localStorageGuessedWords ? JSON.parse(localStorageGuessedWords) : []);
    const [guessedWords, setGuessedWords] = useState<number>(score.length);
    const [bestResult, setBestResult] = useState<number>(localStorageBestResult ? JSON.parse(localStorageBestResult) : 0);

    useEffect(() => {
        mouseEvent(popupRef, isRuleClick, setIsRuleClick);
        mouseEvent(popupRef, isHintClick, setIsHintClick);
        mouseEvent(popupRef, isSettingsClick, setIsSettingsClick);
    }, [isRuleClick, isHintClick, isSettingsClick]);

    useEffect(() => {
        if (isClickSettingsOnMessageModal) {
            setIsSettingsClick(true);
        }
    }, [isClickSettingsOnMessageModal]);

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
        setIsSettingsClick(false);
        setIsRuleClick(state => !state);
    };

    const onHintsClick = () => {
        setIsRuleClick(false);
        setIsSettingsClick(false);
        setIsHintClick(state => !state);
    };

    const onSettingsClick = () => {
        setIsHintClick(false);
        setIsRuleClick(false);
        setIsSettingsClick(state => !state);
    };

    return (
        <div className="info">
            <div className={isDarkTheme ? 'info__icons info__icons__dark' : 'info__icons'}>
                <span ref={popupRef} className="info__icons__rules">
                    <button><FaInfo onClick={onRulesClick} /></button>
                    <InfoText isRuleClick={isRuleClick} />
                </span>
                <span ref={popupRef} className="info__icons__hint">
                    <button><GrInfo onClick={onHintsClick} /></button>
                    <HintText isHintClick={isHintClick} />
                </span>
                <span ref={popupRef} className="info__icons__settings">
                    <button><MdOutlineSettingsSuggest onClick={onSettingsClick} /></button>
                    <Settings
                        isSettingsClick={isSettingsClick}
                        onWordLengthChange={onWordLengthChange}
                        onFirstLetterChange={onFirstLetterChange}
                        onIsUseTopWordsChange={onIsUseTopWordsChange}
                        initialFirstLetter={initialFirstLetter}
                    />
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