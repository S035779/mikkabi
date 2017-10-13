import React from 'react';
import { Link } from 'react-router-dom';
import { log } from '../../../utils/webutils';

const pspid = `NoteHeaderView`;

export default class NoteHeader extends React.Component {
  handleIncrement() {
    log.info(`${pspid}> Request: handleIncrement`);
    this.props.onIncrement();
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    this.props.onDecrement();
  }

  render() {
    const page = this.props.page;
    return <div>
      <header className="toolbar toolbar-header">
      <h1 className="title"><Link to="/">Watch Note!</Link></h1>
      <div className="toolbar-actions">
        <button
          className="btn btn-default">
          <span className="icon icon-home icon-text"></span>
          {page} page
        </button>
        <div className="btn-group">
        <button 
          className="btn btn-default"
          onClick={this.handleIncrement.bind(this)}>
          <span className="icon icon-left"></span>
        </button>
        <button
          className="btn btn-default"
          onClick={this.handleDecrement.bind(this)}>
          <span className="icon icon-right"></span>
        </button>
        </div>
        <button
          className="btn btn-default btn-dropdown pull-right">
          <span className="icon icon-megaphone"></span>
        </button>
      </div>
      </header>
    <div className="tab-group">
      <div className="tab-item active">
      Search of items
      </div>
      <div className="tab-item">
      Available watch-items
      </div>
      <div className="tab-item">
      Completed watch-items
      </div>
    </div>
    </div>;
  }
}
