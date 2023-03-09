/*jshint esversion: 6 */

/* The code in this file was written with some help from Sam 
Timmins' quiz app */

const startButton = document.getElementById('start-btn');

// Welcome section

const welcomeMessageRef = document.getElementById('welcome-message');
const welcomeSection = document.getElementById('welcome');


// User form section

const userSectionRef = document.getElementById('user');
const userFormRef = document.getElementById('user-form');
const userNameRef = document.getElementById('user-name');

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

// User form submit
userFormRef.addEventListener('submit', handleUserFormSubmit);