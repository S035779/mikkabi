import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import appStore from '../../stores/appStore';
import Note from '../../pages/Note/Note';
import Complete from '../../pages/Complete/Complete';
import Products from '../../pages/Products/Products';
import { log } from '../../../utils/webutils';

class App extends React.Component {
  static getStores() {
    return [appStore];
  }

  static calculateState() {
    return appStore.getState();
  }

  render() {
    return <BrowserRouter>
      <div>
      <div>
        <p>Main Manu</p>
        <ul><li>
        <Link to="/note">Search of items</Link>
        </li>
        <li>
        <Link to="/complete">Search of Completed items</Link>
        </li>
        <li>
        <Link to="/products">Search of ProductID</Link>
        </li></ul>
      </div>
      <Route path="/note" component={Note}/>
      <Route path="/complete" component={Complete}/>
      <Route path="/products" component={Products}/>
      </div>
      </BrowserRouter>;
  }
}
export default Container.create(ContainerConverter.convert(App));
