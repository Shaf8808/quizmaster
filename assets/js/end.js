/*jshint esversion: 6 */

/* Variables for final score and username accessed through local storage 
for it to be displayed on end screen upon quiz completion */

const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
const endTitle = document.getElementById('user-person');
const userName = localStorage.getItem('userName');


endTitle.innerText = userName;
finalScore.innerText = mostRecentScore;