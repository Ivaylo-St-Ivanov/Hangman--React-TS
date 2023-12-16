import React, { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';

interface HintTextPros {
    isHintClick: boolean
}

const HintText: React.FC<HintTextPros> = ({ isHintClick }) => {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <p className={`hint ${isHintClick ? 'click-icon' : 'text'}`}>
            &nbsp; <b className={isDarkTheme ? 'text__dark-blue' : ''}>Hangman Tips & Strategies</b>
            <br /><br />
            &nbsp; Use your vowels. Looking at vowels is a good way to start. Since there are only 5, you can fill in some blanks pretty quickly. They can even help you guess the answer straight away. For example, if you try the letter A and the word looks like this ‘_A_A_A’, you might be able to guess straight away that the answer is BANANA just from one letter.
            <br /><br />
            &nbsp; Etaoin shrdlu. "Etaoin shrdlu" is two words listing the most commonly used letters in the English language, in order of frequency. "E" is the most commonly used letter, "t" is second-most common, etc. After trying your vowels, try out a few letters from this list to see if they appear in the word!
            <br /><br />
            &nbsp; Don’t forget your Js and Zs. The letters J and Z always trip people up. They’re both fairly rare and it’s not always obvious when you need one to complete a word. Don’t guess a Z or a J at the very beginning, but keep them in mind as you play.
            <br /><br />
            &nbsp; <b className={isDarkTheme ? 'text__dark-blue' : ''}>What are some of the hardest Hangman words?</b>
            <br /><br />
            &nbsp; One of the hardest words in Hangman is Jazz. Jazz is great because it includes J and Z, two of the most uncommon letters in the alphabet. Along with this, it only has 3 letters in it, which makes it harder for players to guess. According to a 2010 study conducted by Jon McLoone for 'Wolfram Research', the most difficult words to guess include jazz, buzz, hajj, faff, fizz, fuzz and variations of these.
            <br /><br />
            &nbsp; Other great options are words that don’t use the typical A, E, I, O, and U vowels. Some great examples are 'psych' and 'synth' ('rhythm', 'zephyr'). It will be hard guess due to their lack of vowels.
        </p>
    );
};

export default HintText;