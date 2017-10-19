import React from 'react';
import ProductsAction from '../../actions/ProductsAction';
import { log } from '../../../utils/webutils';

const pspid = `ProductsFooterView`;

export default class ProductsFooter extends React.Component {
  handleClickCancel() {
    const {options, pages} = this.props
    ProductsAction.writeItems(options, pages)
  }
  handleClickSave() {
    const {options, pages} = this.props
    ProductsAction.writeItems(options, pages)
  }
  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button
        onClick={this.handleClickCancel.bind(this)}
        className="btn btn-default"
      >Cancel</button>
      <button
        className="btn btn-primary pull-right"
        onClick={this.handleClickSave.bind(this)}
      >Save</button>
      </div>
    </footer>;
  }
};
