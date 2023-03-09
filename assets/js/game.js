/*jshint esversion: 6 */


/* The code in this file was written with the help of
James Q Quick's video tutorial of making a quiz app */

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const homeButton = document.getElementById('home-btn');
const startButton = document.getElementById('start-btn');


// Question counter and score variables
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;

// Default score and question counter
let score = 0;
let questionCounter = 0;
let availableQuestions = [];



// Questions variable which obtains questions from a json file using the fetch method
let questions = [];

fetch("questions.json").then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    });

// Number of points added each time the user is correct and number of questions for question counter

const correctScore = 10;
const maxQuestions = 10;

/* First function that begins once the user clicks play button after 
filling in their details */

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
        // Stores final score of user for it to be accessed on end screen
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }

    // Dynamically updates question counter depending on question user is currently on
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

    /* Adds the true boolean value if the user selects the correct option */

    acceptingAnswers = true;
};

/* Returns answers as "false" if the user selects the wrong option */
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        // Adds incorrect and correct colour to specific option chosen by the user

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        // Dynamically adds the correctScore value by calling incrementScore function
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