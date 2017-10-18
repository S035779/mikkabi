import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import completeStore from '../../stores/completeStore';
import CompleteHeader from '../../components/CompleteHeader/CompleteHeader';
import CompleteBody from '../../components/CompleteBody/CompleteBody';
import CompleteFooter from '../../components/CompleteFooter/CompleteFooter';
import Tabs from '../../components/Tabs/Tabs';
import { log } from '../../../utils/webutils';

const pspid = `CompleteControlerView`;

class Complete extends React.Component {
  static getStores() {
    return [completeStore];
  }

  static calculateState() {
    return completeStore.getState();
  }

  render() {
    const selected = 'complete';
    return <div className="window">
      <CompleteHeader
        page={this.state.page}
        options={this.state.options} />
      <Tabs selected={selected} />
      <CompleteBody
        items={this.state.items}
        options={this.state.options} />
      <CompleteFooter />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Complete));

