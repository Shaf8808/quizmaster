
// Final score variables and access local storage to display score on end screen

const mostRecentScore = localStorage.getItem('mostRecentScore')
const finalScore = document.getElementById('finalScore')
const endTitle = document.getElementById('user-person')
const userName = localStorage.getItem('userName')


endTitle.innerText = userName
finalScore.innerText = mostRecentScore