import React, { useState } from 'react';

import { keys } from '../../utils/keys';
import './Settings.scss';

interface SettingsProps {
    isSettingsClick: boolean;
    onWordLengthChange: (wordLength: number) => void
    onFirstLetterChange: (firstLetter: string) => void
}

const Settings: React.FC<SettingsProps> = ({ isSettingsClick, onWordLengthChange, onFirstLetterChange }) => {
    const [wordLengthInput, setWordLengthInput] = useState<number | ''>('');

    const handleWordLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWordLength = Number(e.target.value);
        setWordLengthInput(newWordLength);
        onWordLengthChange(newWordLength);
    };

    const onResetLength = () => {
        setWordLengthInput('');
        onWordLengthChange(0);
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
            <select className="settings__letters" name="firstLetter" id="firstLetter">First Letter
                <option onClick={() => onFirstLetterChange('')}> </option>
                {keys.map((k: string) => (
                    <option 
                        key={k}
                        onClick={() => onFirstLetterChange(k)}
                    >{k}</option>
                ))}
            </select>
        </div>
    );
};

export default Settings;