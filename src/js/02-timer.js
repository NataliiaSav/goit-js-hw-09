import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');
const currentData = Date.now();
let initData = null;
let timerId = null;

buttonStart.addEventListener('click', onTimerStart);
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    initData = selectedDates[0].getTime();
    if (initData < currentData) {
      window.alert('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onTimerStart() {
  timerId = setInterval(() => {
    let selectData = new Date(input.value).getTime();
    let deltaTime = selectData - currentData;
    // console.log(currentData);
    // console.log(selectData);
    dataDays.textContent = addLeadingZero(convertMs(deltaTime).days);
    dataHours.textContent = addLeadingZero(convertMs(deltaTime).hours);
    dataMinutes.textContent = addLeadingZero(convertMs(deltaTime).minutes);
    dataSeconds.textContent = addLeadingZero(convertMs(deltaTime).seconds);

    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
