import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import noteStore from '../../stores/noteStore';
import NoteAction from '../../actions/NoteAction';
import NoteHeader from '../../components/NoteHeader/NoteHeader';
import NoteBody from '../../components/NoteBody/NoteBody';
import NoteSidebar from '../../components/NoteSidebar/NoteSidebar';
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
    const items = this.state.items;
    const page = this.state.page;
    return <div>
      <NoteHeader
        page={page}
        onIncrement={this.handleIncrement.bind(this)}
        onDecrement={this.handleDecrement.bind(this)}
      />
      <div className="window-content">
        <div className="pane-group">
        <NoteSidebar />
        <NoteBody items={items}/>
        </div>
      </div>
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(Note));

