import React from 'react';
import NoteSidebar from '../../components/NoteSidebar/NoteSidebar';
import NoteTable from '../../components/NoteTable/NoteTable';
import { log } from '../../../utils/webutils';

const pspid = `NoteBodyView`;

export default class NoteBody extends React.Component {
  handleChangeSearch(options) {
    log.trace(`${pspid}> Request: handleChangeSearch`);
    this.props.onChangeSearch(options);
  }

  render() {
    return <div className="window-content">
      <div className="pane-group">
        <NoteSidebar
          items={this.props.items}
          options={this.props.options}
          onChangeSearch={this.handleChangeSearch.bind(this)} />
        <NoteTable items={this.props.items} />
      </div>
    </div>;
  }
};
