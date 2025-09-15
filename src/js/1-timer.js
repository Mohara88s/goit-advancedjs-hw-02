import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startTimeBtn = document.querySelector('button.time-btn');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date(selectedDates[0]) - Date.now() > 0) {
      userSelectedDate = selectedDates[0]
      startTimeBtn.disabled = false;
    } else {
      userSelectedDate = null;
      startTimeBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future'
      });
    }
  },
};

flatpickr(dateInput, options);

startTimeBtn.addEventListener('click', onStartTimeBtnClick);

function onStartTimeBtnClick() {
  if (new Date(userSelectedDate) - Date.now() < 0) {
    userSelectedDate = null;
    startTimeBtn.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future'
    });
    return
  }

  dateInput.disabled = true;
  startTimeBtn.disabled = true;
  const timerId = setInterval(() => {
    const timeToFinish = new Date(userSelectedDate) - Date.now();
    if (timeToFinish > 0) {
      const { days, hours, minutes, seconds } = convertMs(timeToFinish);
      daysSpan.textContent = addLeadingZero(days);
      hoursSpan.textContent = addLeadingZero(hours);
      minutesSpan.textContent = addLeadingZero(minutes);
      secondsSpan.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(timerId);
      dateInput.disabled = false;
      iziToast.success({
        message: 'Countdown is completed!',
      });

    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
};