import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import noteStore from '../../stores/noteStore';
import ProductsHeader
  from '../../components/ProductsHeader/ProductsHeader';
import ProductsBody
  from '../../components/ProductsBody/ProductsBody';
//import ProductsFooter
//  from '../../components/ProductsFooter/ProductsFooter';
import Tabs from '../../components/Tabs/Tabs';
import { log } from '../../../utils/webutils';

const pspid = `ProductsControlerView`;

class Products extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  render() {
    const selected = 'products';
    return <div className="window">
      <ProductsHeader
        page={this.state.page}
        options={this.state.options} />
      <Tabs selected={selected} />
      <ProductsBody
        items={this.state.items}
        options={this.state.options} />
      {/*
      <ProductsFooter options={this.state.options} />
      */}
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Products));

