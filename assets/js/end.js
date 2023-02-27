// Final score variables and access local storage to display score on end screen

const mostRecentScore = localStorage.getItem('mostRecentScore')
const finalScore = document.getElementById('finalScore')

finalScore.innerText = mostRecentScore