import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delayInput = form.elements.delay;
  const delay = parseInt(delayInput.value);

  const stateInput = form.elements.state;
  const state = stateInput.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    result => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${result}ms`,
      });
    },
    error => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${error}ms`,
      });
    }
  );

  // Скидання значень полів форми після відправки
  form.reset();
});
