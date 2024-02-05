import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconClose from '../img/bi_x-octagon.png';

const startButton = document.querySelector('.start-btn');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

startButton.disabled = true;

let selectedDate;
let timeDifference;
let timerInterval;

const datePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    timeDifference = selectedDate.getTime() - Date.now();
    if (selectedDate < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
        iconUrl: iconClose,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

function convertMillisecondsToTimer(ms) {
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

function addLeadingZeroToValue(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay(timeDifference) {
  const timer = convertMillisecondsToTimer(timeDifference);
  daysSpan.textContent = `${addLeadingZeroToValue(timer.days)}`;
  hoursSpan.textContent = `${addLeadingZeroToValue(timer.hours)}`;
  minutesSpan.textContent = `${addLeadingZeroToValue(timer.minutes)}`;
  secondsSpan.textContent = `${addLeadingZeroToValue(timer.seconds)}`;
}

function startCountdownTimer() {
  if (selectedDate > Date.now()) {
    timeDifference = selectedDate.getTime() - Date.now();
    timerInterval = setInterval(() => {
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
      } else {
        updateTimerDisplay(timeDifference);
        timeDifference -= 1000;
      }
    }, 1000);
  } else {
    iziToast.show({
      message: 'Please choose a date in the future',
      messageColor: '#FFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      iconUrl: iconClose,
    });
  }
}

flatpickr('#datetime-picker', datePickerOptions);

startButton.addEventListener('click', () => {
  if (selectedDate > Date.now()) {
    startCountdownTimer();
    startButton.disabled = true;
  } else {
    iziToast.show({
      message: 'Please choose a date in the future',
      messageColor: '#FFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      iconUrl: iconClose,
    });
  }
});
