
let maxTextSize = 50;
let minTextSize = 5;

const authorsList = [
    {
        _id: 1,
        name: 'Todd',
    },
    {
        _id: 3,
        name: 'Rob',
    },
    {
        _id: 3,
        name: 'Sevil',
    },
];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomAuthor = () => {
    return authorsList[`${getRandomNumber(0,3)}`]['name'];
}
const getRandomText = (min, max) => {
    let string = '';
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,.';
    for (let i = 0; i < getRandomNumber(min, max); i++) {
        for ( let i = 0; i < getRandomNumber(1, 10); i++ ) {  //string from 1 to 10 characters
            string += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        result.push(string);
        string = '';
    }

    return result.join(' ');
}

export let eventState = {state: false};
export const sendEvent = () => {
    const dispatch = (event) => document.dispatchEvent(event);
    let timeout = () => {
        setTimeout(function() {
            let event = new CustomEvent("shout", {
                detail: { text: getRandomText(minTextSize, maxTextSize),
                          author: getRandomAuthor(), }
            });
            dispatch(event);
            if (eventState.state) {
                timeout();
            }
        }, getRandomNumber(1000, 5000));
    }
    if (eventState.state) { timeout() };
}


