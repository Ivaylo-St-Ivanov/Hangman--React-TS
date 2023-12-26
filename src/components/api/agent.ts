const baseUrl = 'https://random-word-api.vercel.app/api?words=1';

const request = async (url: string) => {
    const response = await fetch(url);

    return await response.json();
};

const getRandomWord = async () => {
    return await request(baseUrl);
};

const getRandomWordWithFixedLength = async (length: number) => {
    return await request(`${baseUrl}&length=${length}`);
};

export const agent = {
    getRandomWord,
    getRandomWordWithFixedLength
};
