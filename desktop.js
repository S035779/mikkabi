const { app } = require('electron');
const NoteWindow = require('./views/note-window');
const CompleteWindow = require('./views/complete-window');
const ProductsWindow = require('./views/products-window');
const AppMenu = require('./views/app-menu');

class Main {
  constructor() {
    this.start();
    this.NoteWindow = new NoteWindow();
    this.CompleteWindow = new CompleteWindow();
    this.ProductsWindow = new ProductsWindow();
  }
  start() {
    app.on('ready', () => {
      AppMenu.setup();
    });
  }
};

const main = new Main();
