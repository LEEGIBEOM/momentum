const time = document.querySelector(".content-clock__time"),
  format = document.querySelector(".content-clock__format"),
  askName = document.querySelector(".content__askName"),
  input = askName.querySelector("input"),
  message = document.querySelector(".content__message");
const USER_NAME = "user_name";
const HIDDEN = "hidden";
const greeting = [
  "Good morning",
  "Have a good lunch",
  "Have a nice dinner",
  "Good night",
];
let greetingIndex = 0;

const displayClock = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  time.innerText = `${
    hour < 13
      ? hour < 10
        ? "0" + hour
        : hour
      : hour - 12 < 10
      ? "0" + hour
      : hour
  }:${minute < 10 ? "0" + minute : minute}`;

  format.innerText = hour < 13 ? "AM" : "PM";

  if (hour >= 6 && hour < 12) greetingIndex = 0;
  else if (hour >= 12 && hour < 18) greetingIndex = 1;
  else if (hour >= 18 && hour < 22) greetingIndex = 2;
  else greetingIndex = 3;
};

const handleSubmitName = (e) => {
  e.preventDefault();
  localStorage.setItem(USER_NAME, input.value);
  displayMessage(input.value);
  input.value = "";
};

const displayMessage = (name) => {
  askName.classList.add(HIDDEN);
  message.classList.remove(HIDDEN);
  message.innerText = `${greeting[greetingIndex]}, ${name}!`;
};

const checkName = () => {
  const name = localStorage.getItem(USER_NAME);
  if (name) {
    displayMessage(name);
  } else {
    askName.addEventListener("submit", handleSubmitName);
  }
};

const init = () => {
  displayClock();
  checkName();
  setInterval(displayClock, 10000);
};

init();
