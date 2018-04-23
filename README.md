# Handlebars Form Handler

[![licence](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat-square)]() [![tag](https://img.shields.io/badge/tag-v0.0.4-lightgrey.svg?style=flat-square)]()

A form handler built in ES6 and handlebars. Developed for [webpack-handlebars-static-file-generator](https://github.com/francbelak/webpack-handlebars-static-file-generator).

## Usage

```js
import FormHandler from '~hbs-form-handler';

window.addEventListener('DOMContentLoaded', () => {
  new FormHandler({
    url: './',
    beforeSubmit: event => {
      event.preventDefault();
      // Handle validation here, return false to break
    },
    success: data => {
      // Success handling
    },
    error: error => {
      // Error handling
    }
  });
});
```

See example for more details.

## API

#### constructor

| Parameter | Type | Description |
|---|---|---|
| settings | ``Object`` | Options object |
| settings.url | ``String (url)`` | Url to send form data |
| settings.beforeSubmit | ``Function (beforeSubmit)`` | Hook to implement validation, return false to prevent form submitting |
| settings.success | ``Function (success)``  | Hook to modify success handling |
| settings.error | ``Function (error)`` | Hook to modify error handling |

#### onSubmit ⇨ ``void``

Submits form and implements the three hooks (beforeSend, success, error)

*Returns*: ``void``

## License

MIT
