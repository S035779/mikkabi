import React from 'react';
import ProductsAction from '../../actions/ProductsAction';
import { log } from '../../../utils/webutils';

const pspid = `ProductsFooterView`;

export default class ProductsFooter extends React.Component {
  handleChangeButtonClose() {
  }

  handleChangeButtonSave() {
  }

  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button
        onClick={this.handleChangeButtonClose.bind(this)}
        className="btn btn-default"
      >Close</button>
      <button
        className="btn btn-primary pull-right"
        onClick={this.handleChangeButtonSave.bind(this)}
      >Save</button>
      </div>
    </footer>;
  }
};
