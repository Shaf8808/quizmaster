/* The code in this file was written with some help from Sam 
Timmins' quiz app */

const startButton = document.querySelector('#start-btn');
const welcomeMessage = document.querySelector('#welcome-message');
const welcomeSection = document.querySelector('#welcome');
const userSection = document.querySelector('#user');
const userForm = document.querySelector('#user-form');
const userName = document.querySelector('#user-name');

const userFormOpen = () => {
    welcomeMessage.innerHTML = '';
    userName.value = '';
    userName.focus();
};

const handleUserFormSubmit = event => {
    event.preventDefault();
    userSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
    welcomeMessage.innerHTML = `Are you ready ${userName.value}?`;
    localStorage.setItem('userName', userName.value);
    startButton.classList.remove('hidden');
};

userForm.addEventListener('submit', handleUserFormSubmit);