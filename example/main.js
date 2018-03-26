import FormHandler from '../src/js/modules/form-handler';

window.addEventListener('DOMContentLoaded', () => {
  new FormHandler({
    url: window.location.hash === '#error' ? '/nonexisting.html' : './',
    success: data => {
      let div = document.createElement('div');
      div.innerHTML = document.querySelector('#success').innerHTML;
      document.querySelector('body').appendChild(div);
    },
    error: error => {
      let div = document.createElement('div');
      div.innerHTML = document.querySelector('#error').innerHTML;
      document.querySelector('body').appendChild(div);
    }
  });
});
