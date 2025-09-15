const formData = { email: "", message: "" }

const form = document.querySelector(".feedback-form");
const textarea = form.elements.message;
const localStorageKey = "feedback-form-state";

const storageData = localStorage.getItem(localStorageKey);
if (storageData !== null) {
  const storageInitFormData = JSON.parse(storageData);
  for (let key in storageInitFormData) {
    if (form.elements[key]) {
      form[key].value = storageInitFormData[key]
      formData[key] = storageInitFormData[key]
    }
  }
}

form.addEventListener("input", (evt) => {
  formData[evt.target.name] = evt.target.value
  localStorage.setItem(localStorageKey, JSON.stringify(formData));
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (formData.email === '' || formData.message === '') {
    console.log('Fill please all fields')
    return
  }
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  for (let key in formData) {
    formData[key] = '';
  }
  form.reset();
});