const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const homeButton = document.getElementById('home-btn')

// Question counter and score variables
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')

let currentQuestion = {};
let acceptingAnswers = false;

// Default score and question counter
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Questions variable which obtains questions from a json file using the fetch method
let questions = [];

fetch("questions.json").then(res => {
return res.json()
})
.then(loadedQuestions => {
    questions = loadedQuestions
    startGame()
})
// Logs any error that may occur while playing or loading up the quiz
.catch(err => {
    console.log(err)
})

// Number of points added each time the user is correct and number of questions for question counter

const correctScore = 10;
const maxQuestions = 10;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(availableQuestions)
    getNewQuestion()
}


/**
 * Updates question counter, randomly generates a question and it's choices
 */
getNewQuestion = () => {

    // Once the user finishes the quiz, they are navigated to the "end" page

    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        // Stores final score of user for it to be accessed on end screen
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("end.html")
    }

    // Dynamically updates question counter depending on question user is currently on
    questionCounter++
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        // Adds incorrect and correct colour to specific option chosen by the user

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

            // Dynamically adds the correctScore value by calling incrementScore function
            if(classToApply === 'correct') {
                incrementScore(correctScore)
            }
        selectedChoice.parentElement.classList.add(classToApply)


        /**
         * Navigates the user to the next question after a 
         * 2 second delay and removes the class of correct and incorrect
         */
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 2000)
    })
})

/**
 * Updates score number depending on the user's choice
 * once it is called
 */
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

