import React from 'react';
import ProductsSidebar from '../../components/ProductsSidebar/ProductsSidebar';
import ProductsTable from '../../components/ProductsTable/ProductsTable';
import { log } from '../../../utils/webutils';

const pspid = `ProductsBodyView`;

export default class ProductsBody extends React.Component {
  render() {
    return <div className="window-content">
      <div className="pane-group">
        <ProductsSidebar
          items={this.props.items}
          options={this.props.options} />
        <ProductsTable
          items={this.props.items}
          options={this.props.options} />
      </div>
    </div>;
  }
};
