import App from './app';
import TestServiceController from './service.controller';
const app = new App(
  [
    new TestServiceController(),
  ],
);

app.listen();