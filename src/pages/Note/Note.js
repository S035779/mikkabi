import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import noteStore from '../../stores/noteStore';
import NoteAction from '../../actions/NoteAction';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import NoteBody from '../../components/NoteBody/NoteBody';
import NoteFooter from '../../components/NoteFooter/NoteFooter';
import Tabs from '../../components/Tabs/Tabs';
import { log } from '../../../utils/webutils';

const pspid = `NoteControlerView`;
const query = 'コーチ レザー';

class Note extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  componentDidMount() {
    NoteAction.increment(query, this.state.page);
  }

  handleHomeClick() {
    log.info(`${pspid}> Request: handleHomeClick`);
    NoteAction.increment(query, 0);
    //NoteAction.incrementCloseWatch(this.state.page);
  }

  handleIncrement() {
    log.info(`${pspid}> Request: handleIncrement`);
    NoteAction.increment(query, this.state.page);
    //NoteAction.incrementCloseWatch(this.state.page);
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    NoteAction.decrement(query, this.state.page);
    //NoteAction.decrementCloseWatch(this.state.page);
  }

  render() {
    const page = this.state.page;
    const items = this.state.items;
    const options = this.state.options;
    return <div className="window">
      <NoteHeader page={page}
        onHomeClick={this.handleHomeClick.bind(this)}
        onIncrement={this.handleIncrement.bind(this)}
        onDecrement={this.handleDecrement.bind(this)} />
      <Tabs />
      <NoteBody items={items} options={options} />
      <NoteFooter />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Note));

