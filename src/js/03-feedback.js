import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const formData = {};

form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

fillFormFields();

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillFormFields() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    const parsedData = JSON.parse(savedMessage);
    email.value = parsedData.email;
    message.value = parsedData.message;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
