function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const unauthorizedMessages = [
    "Who do you think you are?",
    "You are not allowed, demon.",
    "I saw that attempt.",
    "No."
];

function getRandomUnauthorizedMessage(){
    return unauthorizedMessages[getRandomInt(0, unauthorizedMessages.length)]
}

const chatterMessages = [
    "What are you doing?",
    "Do you even understand what that does?",
    "I will find you.",
    "Darkness awaits for the overzealous."
];

function getRandomChatterMessage(){
    return chatterMessages[getRandomInt(0, chatterMessages.length)];
}


function randomlyPrintMessage(message, probability, logger){
    if (getRandomInt(0, probability) === 0){
        logger.gm(message);
    }
}

module.exports = {
    getRandomUnauthorizedMessage,
    randomlyPrintMessage,
    getRandomChatterMessage
};