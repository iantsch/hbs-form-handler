import 'whatwg-fetch';

export default class FormHandler {
  constructor(...args) {
    this.settings = Object.assign({
      url: './',
      form: document.querySelector('.form'),
      beforeSubmit: event => {
        event.preventDefault();
      },
      success: data => {
        console.info(data);
      },
      error: error => {
        console.error(error);
      }
    }, ...args);
    console.log(this.settings);
    this.onSubmit = this.onSubmit.bind(this);
    this.settings.form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(event) {
    if (false === this.settings.beforeSubmit(event)) {
      return;
    }
    fetch(this.settings.url, {
      method: 'POST',
      body: new FormData(this.settings.form),
      credentials: 'same-origin'
    }).then(response => {
        if (response.status >= 300) {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
        return response
      })
      .then(data => this.settings.success(data))
      .catch(error => this.settings.error(error))
  }
}
