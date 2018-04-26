import 'whatwg-fetch';

export default class FormHandler {
  constructor(...args) {
    this.isListening = false;
    this.settings = Object.assign({
      url: './',
      listen: true,
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
    this.onSubmit = this.onSubmit.bind(this);
    if (this.settings.listen) {
      this.listen();
    }
  }

  listen() {
    if (this.isListening) {
      return;
    }
    this.settings.form.addEventListener('submit', this.onSubmit);
    this.isListening = true;
  }

  stopListen() {
    if (!this.isListening) {
      return;
    }
    this.settings.form.removeEventListener('submit', this.onSubmit);
    this.isListening = false;
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
