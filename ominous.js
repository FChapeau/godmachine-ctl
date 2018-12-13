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

module.exports = {
    getRandomUnauthorizedMessage
};