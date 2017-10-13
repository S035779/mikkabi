import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `GlobalFooterView`;

export default class GlobalFooter extends React.Component {
  render() {
    return <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button className="btn btn-default">Cancel
      </button>
      <button className="btn btn-primary pull-right">Save
      </button>
      </div>
    </footer>
  }
}
