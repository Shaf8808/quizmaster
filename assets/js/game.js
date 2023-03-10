/* The code in this file was written with the help of
James Q Quick's video tutorial of making a quiz app */

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const homeButton = document.querySelector('#home-btn');
const startButton = document.querySelector('#start-btn');
const questionCounterText = document.querySelector('#questionCounter');
const scoreText = document.querySelector('#score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
const correctScore = 10;
const maxQuestions = 10;

fetch("./assets/data/questions.json").then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    });

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

/**
 * Updates question counter, randomly generates a question and it's choices
 */

getNewQuestion = () => {

    // Once the user finishes the quiz, they are navigated to the "end" page

    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;

    /* This takes a random number from my questions array and 
    displays it as the current question that the user is on. */

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    /* Adds a number dataset in order to distinguish the correct option
    from the others */

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

/* Returns answers as "false" if the user selects the wrong option */

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        // Adds incorrect and correct colour class to the option chosen by the user

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply === 'correct') {
            incrementScore(correctScore);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        /**
         * Navigates the user to the next question after a 
         * 2 second delay and removes the class of correct and incorrect
         */

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);
    });
});

/**
 * Updates score number depending on the user's choice
 * once it is called
 */

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};