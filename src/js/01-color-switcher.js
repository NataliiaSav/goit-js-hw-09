const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  buttonStart.removeAttribute('disabled');
});
