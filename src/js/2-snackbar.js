import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formData = { delay: "", state: "" }
const form = document.querySelector(".form");

form.addEventListener("input", (evt) => {
  formData[evt.target.name] = evt.target.value
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (formData.delay === '' || formData.state === '') {
    iziToast.warning({
      message: 'Fill please all fields'
    });
    return
  }
  if (formData.delay <= 0) {
    iziToast.warning({
      message: 'Delay should be a positive number'
    });
    return
  }
  // console.log(formData);
  makePromise(formData)
    .then(delay => iziToast.success({
      message: `✅ Fulfilled promise in ${delay}ms`,
    }))
    .catch(delay => iziToast.error({
      message: `❌ Rejected promise in ${delay}ms`
    }));
  for (let key in formData) {
    formData[key] = '';
  }
  form.reset();
});

function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay)
      } else {
        reject(delay)
      }
    }, delay);
  });
};