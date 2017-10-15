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

class Note extends React.Component {
  static getStores() {
    return [noteStore];
  }

  static calculateState() {
    return noteStore.getState();
  }

  componentDidMount() {
    const options = this.state.options;
    const page = this.state.page;
    NoteAction.increment(options, page);
  }

  handleChangeHome() {
    log.info(`${pspid}> Request: handleChangeHome`);
    const options = this.state.options;
    NoteAction.increment(options, 0);
    //NoteAction.incrementCloseWatch(this.state.page);
  }

  handleChangeSearch(options) {
    log.info(`${pspid}> Request: handleChangeSearch`);
    NoteAction.increment(options, 0);
    this.setState({ options });
  }

  handleIncrement() {
    log.info(`${pspid}> Request: handleIncrement`);
    const options = this.state.options;
    const page = this.state.page;
    log.trace(this.state.options);
    NoteAction.increment(options, page);
    //NoteAction.incrementCloseWatch(this.state.page);
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    const options = this.state.options;
    const page = this.state.page;
    NoteAction.decrement(options, page);
    //NoteAction.decrementCloseWatch(this.state.page);
  }

  render() {
    return <div className="window">
      <NoteHeader
        page={this.state.page}
        onChangeHome={this.handleChangeHome.bind(this)}
        onIncrement={this.handleIncrement.bind(this)}
        onDecrement={this.handleDecrement.bind(this)} />
      <Tabs />
      <NoteBody
        items={this.state.items}
        options={this.state.options}
        onChangeSearch={this.handleChangeSearch.bind(this)} />
      <NoteFooter />
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Note));

