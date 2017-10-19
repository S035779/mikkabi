import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { log } from '../../../utils/webutils';

const pspid = `TabsView`;

//class Tabs extends React.Component {
export default class Tabs extends React.Component {
  handleClickPage(path) {
    //this.props.history.push(path);
  }
  joinClass(name) {
    const selected = this.props.selected;
    const classNames = ['tab-item'];
    if(selected === name) classNames.push('active');
    return classNames.join(' ');
  }
  render() {
    return <div className="tab-group">
      <div className={this.joinClass('note')}
        onClick={this.handleClickPage.bind(this, '/note')}
      >Search of items</div>
      <div className={this.joinClass('complete')}
        onClick={this.handleClickPage.bind(this, '/complete')}
      >Search of Completed items</div>
      <div className={this.joinClass('products')}
        onClick={this.handleClickPage.bind(this, '/products')}
      >Search of ProductID</div>
    </div>;
  }
}
//export default withRouter(Tabs);
