import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GoDash } from 'react-icons/go';

import { keys } from '../../utils/keys';
import './Settings.scss';

interface SettingsProps {
    isSettingsClick: boolean;
    onWordLengthChange: (wordLength: number) => void
    onFirstLetterChange: (firstLetter: string) => void
    onIsUseTopWordsChange: () => void
    initialFirstLetter: string
}

const Settings: React.FC<SettingsProps> = ({ isSettingsClick, onWordLengthChange, onFirstLetterChange, onIsUseTopWordsChange, initialFirstLetter }) => {
    const localStorageWordLength = localStorage.getItem('wordLength');
    const [wordLengthInput, setWordLengthInput] = useState<number | ''>(localStorageWordLength ? JSON.parse(localStorageWordLength) : '');
    const localStorageIsUsedTopWords = localStorage.getItem('isUsedTopWords');
    const [isUseTopWords, setIsUseTopWords] = useState<boolean>(localStorageIsUsedTopWords ? JSON.parse(localStorageIsUsedTopWords) : false);

    const handleWordLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWordLength = Number(e.target.value);
        setWordLengthInput(newWordLength);
        onWordLengthChange(newWordLength);
    };

    const onResetLength = () => {
        setWordLengthInput('');
        onWordLengthChange(0);
        localStorage.removeItem('wordLength');
    };

    const handleUseTopWordsChange = () => {
        setIsUseTopWords(state => !state);
        onIsUseTopWordsChange();
    };

    return (
        <div className={`settings ${isSettingsClick ? 'click-icon' : 'content'}`}>
            <label htmlFor="wordLength"><b>Word length</b></label>
            <input
                type="number"
                onChange={handleWordLengthChange}
                value={wordLengthInput}
                className="settings__word-length"
                min="3"
                max="9"
                name="wordLength"
            />
            <button onClick={onResetLength} className="settings__reset-length">Reset</button>
            <p>Word length can be between 3 and 9 inclusive. Without set it, length will be different every time.</p>

            <hr />

            <label htmlFor="firstLetter"><b>First letter</b></label>
            <select className="settings__letters" defaultValue={initialFirstLetter} name="firstLetter" id="firstLetter">First Letter
                <option onClick={() => onFirstLetterChange('')}>Clear</option>
                {keys.map((k: string) => (
                    <option
                        key={k}
                        onClick={() => onFirstLetterChange(k)}
                    >{k}</option>
                ))}
            </select>

            <hr />

            <label htmlFor="topWords"><b>Top words</b></label>
            <div onClick={handleUseTopWordsChange} className="settings__top-words">
                <div className="settings__top-words__button">
                    <FaCheck />
                    <GoDash />
                    <span className={`settings__top-words__button__${isUseTopWords ? 'right' : 'left'}`}></span>
                </div>
            </div>
            <p>This option choose between top 3 000 words in English</p>
        </div>
    );
};

export default Settings;