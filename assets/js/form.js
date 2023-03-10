/* The code in this file was written with some help from Sam 
Timmins' quiz app */

const startButton = document.querySelector('#start-btn');
const welcomeMessageRef = document.querySelector('#welcome-message');
const welcomeSection = document.querySelector('#welcome');
const userSectionRef = document.querySelector('#user');
const userFormRef = document.querySelector('#user-form');
const userNameRef = document.querySelector('#user-name');

const userFormOpen = () => {
    welcomeMessageRef.innerHTML = '';
    userNameRef.value = '';
    userNameRef.focus();
};

const handleUserFormSubmit = event => {
    event.preventDefault();
    userSectionRef.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
    welcomeMessageRef.innerHTML = `Are you ready ${userNameRef.value}?`;
    localStorage.setItem('userName', userNameRef.value);
    startButton.classList.remove('hidden');
};

userFormRef.addEventListener('submit', handleUserFormSubmit);