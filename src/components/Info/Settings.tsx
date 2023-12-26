import React, { useState } from 'react';

import './Settings.scss';

interface SettingsProps {
    isSettingsClick: boolean;
    onWordLengthChange: (wordLength: number) => void
}

const Settings: React.FC<SettingsProps> = ({ isSettingsClick, onWordLengthChange }) => {
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
        <div className={`settings ${isSettingsClick ? 'click-icon' : 'text'}`}>
            <label htmlFor="settings"><b>Word length</b></label>
            <input
                type="number"
                onChange={handleWordLengthChange}
                value={wordLengthInput}
                className="settings__word-length"
                min="3"
                max="9"
                name="settings"
            />
            <button onClick={onResetLength} className="settings__reset-length">Reset</button>
            <p>Word length can be between 3 and 9 inclusive. Without set it, length will be different every time.</p>
        </div>
    );
};

export default Settings;