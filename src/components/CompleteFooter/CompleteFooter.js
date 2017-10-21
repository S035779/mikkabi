import React from 'react';
import CompleteAction from '../../actions/CompleteAction';
import { log } from '../../../utils/webutils';

import electron from 'electron';
const app = electron.app;
const remote = electron.remote;
const dialog = electron.remote.dialog;

const pspid = `CompleteFooterView`;

export default class CompleteFooter extends React.Component {
  handleClickClose() {
    this.showMessageBox((response) => {
      log.trace(`${pspid}>`, 'Click button:', response);
      const win = remote.getCurrentWindow();
      if(!response) win.close();
    });
  }

  handleClickSave() {
    const options = this.props.options;
    this.showSaveDialog((filename) => {
      log.info(`${pspid}>`, 'Save file:', filename);
      CompleteAction.writeCompleteItems(options)
      .catch((err) => { this.showErrorBox(err) });
    });
  }

  showSaveDialog(callback) {
    const win = remote.getCurrentWindow();
    const options = {
      title: 'Save',
      filters: [
        { name: 'JPEG File', extensions: ['jpg', 'jpeg']},
        { name: 'All Files', extensions: ['*'] }
    ]};
    dialog.showSaveDialog(win, options, callback);
  }

  showMessageBox(callback) {
    const win = remote.getCurrentWindow();
    const options = {
      type: 'info',
      buttons: ['Quit', 'Cancel'],
      title: 'Quit',
      message: 'Would you like to close this window?',
      detail: 'Close this window.'
    };
    dialog.showMessageBox(win, options, callback);
  }

  showErrorBox(err) {
    dialog.showErrorBox("Error", err.message);
  }

  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button
        onClick={this.handleClickClose.bind(this)}
        className="btn btn-default"
      >Close</button>
      <button
        className="btn btn-primary pull-right"
        onClick={this.handleClickSave.bind(this)}
      >Save</button>
      </div>
    </footer>;
  }
};
