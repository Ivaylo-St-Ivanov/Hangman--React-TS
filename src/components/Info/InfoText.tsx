import React, { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';

interface InfoTextProps {
    isRuleClick: boolean
}

const InfoText: React.FC<InfoTextProps> = ({ isRuleClick }) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <p className={`rules ${isRuleClick ? 'click-icon' : 'content'}`}>
            &nbsp; <b className={isDarkTheme ? 'text__dark-blue' : ''}>Hangman Instructions</b>
            <br /><br />
            &nbsp; Guess the letters in the secret word to solve the puzzle within a certain number of guesses (6). You can guess a letter by clicking it or typing it on your keyboard. If you guess a letter which occurs in the word, it appears in all its correct positions. If the suggested letter does not occur in the word, on screen adds one element of a hanged stick figure as a tally mark. The game ends once the word is guessed, or if the stick figure is complete — signifying that all guesses have been used.
            <br /><br />
            &nbsp; <b className={isDarkTheme ? 'text__dark-blue' : ''}>What do you learn from playing Hangman?</b>
            <br /><br />
            &nbsp; Hangman teaches you spelling, vocabulary, and other related language skills. Hangman can also help expand your topical knowledge.
            <br /><br />
            &nbsp; <b className={isDarkTheme ? 'text__dark-blue' : ''}>History of Hangman game</b>
            <br /><br />
            &nbsp; Though the origins of the game are unknown, a variant is mentioned in a book of children's games assembled by Alice Gomme in 1894 called 'Birds, Beasts, and Fishes'. This version lacks the image of a hanged man, instead relying on keeping score as to the number of attempts it took each player to fill in the blanks.
            <br /><br />
            &nbsp; A version which incorporated hanging imagery was described in a 1902 article in 'The Philadelphia Inquirer', which stated that it was popular at "White Cap" parties hosted by 'Vigilance Committees' where guests would wear "white peaked caps with masks".
            <br /><br />
            &nbsp; Originally a paper-and-pencil game, there are now electronic versions.
        </p>
    );
};

export default InfoText;