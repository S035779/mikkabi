import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './pages/App/App';
import Note from './pages/Note/Note';
import Complete from './pages/Complete/Complete';
import Products from './pages/Products/Products';
 
const Root = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Note}/>
    <Route path="/note" component={Note}/>
    <Route path="/complete" component={Complete}/>
    <Route path="/products" component={Products}/>
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById('app'));
