import allWords from '../../utils/wordsList.json';
import { agent } from './agent';

const filterWordsByLength = (words: string[], length: number) => words.filter(word => word.length == length);

const filterWordsByFirstLetter = (words: string[], firstLetter: string) => words.filter(word => word[0] == firstLetter);

const getRandomWordFromArray = (words: string[]) => words[Math.floor(Math.random() * words.length)];

export const getWord = async (wordLength: number, firstLetter: string, isUseTopWords: boolean) => {

    if (isUseTopWords) {
        let filteredWords = allWords;

        if (wordLength >= 3 && wordLength <= 9) {
            filteredWords = filterWordsByLength(filteredWords, wordLength);
        }

        if (firstLetter) {
            filteredWords = filterWordsByFirstLetter(filteredWords, firstLetter);
        }

        return getRandomWordFromArray(filteredWords);
    } else {
        let word;

        if (wordLength >= 3 && wordLength <= 9) {
            if (firstLetter) {
                word = await agent.getRandomWordWithFixedLengthAndFixedFirstLetter(wordLength, firstLetter);
            } else {
                word = await agent.getRandomWordWithFixedLength(wordLength);
            }
        } else {
            if (firstLetter) {
                word = await agent.getRandomWordWithFixedFirstLetter(firstLetter);
            } else {
                word = await agent.getRandomWord();
            }
        }

        return word[0];
    }
};