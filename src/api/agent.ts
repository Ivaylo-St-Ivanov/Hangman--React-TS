const baseUrl = 'https://random-word-api.vercel.app/api?words=1';

const request = async (url: string) => {
    const response = await fetch(url);

    return await response.json();
};

const getRandomWord = async () => {
    return await request(baseUrl);
};

const getRandomWordWithFixedFirstLetter = async (letter: string) => {
    return await request(`${baseUrl}&letter=${letter}`);
};

const getRandomWordWithFixedLength = async (length: number) => {
    return await request(`${baseUrl}&length=${length}`);
};

const getRandomWordWithFixedLengthAndFixedFirstLetter = async (length: number, letter: string) => {
    return await request(`${baseUrl}&length=${length}&letter=${letter}`);
};

export const agent = {
    getRandomWord,
    getRandomWordWithFixedFirstLetter,
    getRandomWordWithFixedLength,
    getRandomWordWithFixedLengthAndFixedFirstLetter
};
