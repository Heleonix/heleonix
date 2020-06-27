import { App } from '@heleonix/core';
import { ModelOne } from './Models';

class MyApp extends App {
  get components() {
    return { ModelOne };
  }
}

const myApp = new MyApp();

myApp.run();
