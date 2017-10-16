import React from 'react';
import NoteAction from '../../actions/NoteAction';
import Radio from '../../components/Radio/Radio';
import { log } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const pspid = `NoteSidebarView`;

export default class NoteSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options);
  }

  handleChangeSearch(e) {
    log.info(`${pspid}>`, 'Request: handleChangeSearch');
    log.trace(`${pspid}>`, this.state);
    NoteAction.increment(this.state, 0);
    e.preventDefault();
  }

  handleChangeReset() {
    log.info(`${pspid}>`, 'Request: handleChangeReset');
    log.trace(`${pspid}>`, this.state);
    this.setState({
      highestPrice: ''
      , lowestPrice: ''
      , shipping: 'ALL'
      , condition: 'ALL'
      , status: 'ALL'
      , itemId: []
      , categoryPath: []
      , seller: []
    });
  }

  handleChangeText(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeCheckbox(name, e) {
    let newState = {};
    newState[name] = e.target.checked;
    this.setState(newState);
  }

  handleChangeRadio(name, e) {
    let newState = {};
    newState[name] = e.target.value;
    this.setState(newState);
  }

  handleChangeSelect(name, e) {
    let newState = {};
    let options = e.target.options;
    let values = [];
    for( let i=0; i<options.length; i++) {
      if(options[i].selected) values.push(options[i].value);
    }
    newState[name] = values;
    this.setState(newState);
  }

  renderOption(objs, prop1, prop2) {
    if(!objs) return null;
    const len = arguments.length;
    const items = objs.map(obj => {
      return (len === 2)
        ? obj[prop1][0]
        : obj[prop1][0][prop2][0];
    })
    const opts = std.dst(items);
    return opts.map((opt, idx) => {
      return <option
        key={"choice-" + idx} value={opt} >{opt}</option>;
    })
  }

  render() {
    const optPaths = this.renderOption(this.props.items
      , 'primaryCategory', 'categoryName');
    const optSelrs = this.renderOption(this.props.items
      , 'sellerInfo', 'sellerUserName');
    const optAuIDs = this.renderOption(this.props.items
      , 'itemId');
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Title</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Search of items"
          value={this.state.searchString}
          onChange={
            this.handleChangeText.bind(this, 'searchString')} />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-actions">
        <button className="btn btn-mini btn-default"
          onClick={this.handleChangeReset.bind(this)}>Reset
        </button>
        <button className="btn btn-mini btn-primary"
          onClick={this.handleChangeSearch.bind(this)}>Search
        </button>
        </div>
      </span>
      <h5 className="nav-group-title">Category</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.categoryPath}
          onChange={
            this.handleChangeSelect.bind(this, 'categoryPath')}
        >{optPaths}</select>
      </span>
      <h5 className="nav-group-title">Seller</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.seller}
          onChange={this.handleChangeSelect.bind(this, 'seller')}
        >{optSelrs}</select>
      </span>
      <h5 className="nav-group-title">ItemID</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.itemId}
          onChange={
            this.handleChangeSelect.bind(this, 'itemId')}
        >{optAuIDs}</select>
      </span>
      <h5 className="nav-group-title">Price</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Highest price" 
          value={this.state.highestPrice}
          onChange={
            this.handleChangeText.bind(this, 'highestPrice')} />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Lowest price" 
          value={this.state.lowestPrice}
          onChange={
            this.handleChangeText.bind(this, 'lowestPrice')} />
        </div>
      </span>
      <h5 className="nav-group-title">Shipping</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={false}
          value={this.state.shipping}
          onChange={
            this.handleChangeSelect.bind(this, 'shipping')
          } >
          <option value="ALL">ALL</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="AT">Austria</option>
          <option value="AU">Australia</option>
          <option value="BE">Belgium</option>
          <option value="CA">Canada</option>
          <option value="CH">Switzerland</option>
          <option value="CN">China</option>
          <option value="DE">Germany</option>
          <option value="ES">Spain</option>
          <option value="Europe">Europe</option>
          <option value="EuropeanUnion">EuropeanUnion</option>
          <option value="FR">France</option>
          <option value="GB">United Kingdom</option>
          <option value="Greater China">Greater China</option>
          <option value="HK">Hong Kong</option>
          <option value="IE">Ireland</option>
          <option value="IN">India</option>
          <option value="IT">Italy</option>
          <option value="JP">Japan</option>
          <option value="MX">Mexico</option>
          <option value="NL">Netherlands</option>
          <option value="None">No shipping.</option>
          <option value="NZ">New Zealand</option>
          <option value="Rest of Asia">Rest of Asia</option>
          <option value="TW">Taiwan</option>
          <option value="US">United States</option>
          <option value="Worldwide">Worldwide</option>
        </select>
      </span>
      <h5 className="nav-group-title">Condition</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={false}
          value={this.state.condition}
          onChange={
            this.handleChangeSelect.bind(this, 'condition')
          } >
          <option value="ALL">ALL</option>
          <option value="New">New</option>
          <option value="New other (see details)">
            New other (see details)</option>
          <option value="New with defects">
            New with defects</option>
          <option value="Manufacturer refurbished">
            Manufacturer refurbished</option>
          <option value="Seller refurbished">
            Seller refurbished</option>
          <option value="Used">Used</option>
          <option value="Very Good">Very Good</option>
          <option value="Good">Good</option>
          <option value="Acceptable">Acceptable</option>
          <option value="For parts or not working">
            For parts or not working</option>
        </select>
      </span>
      <h5 className="nav-group-title">Status</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={false}
          value={this.state.status}
          onChange={
            this.handleChangeSelect.bind(this, 'status')
          } >
          <option value="ALL">ALL</option>
          <option value="Active">Active</option>
          <option value="Canceled">Canceled</option>
          <option value="Ended">Ended</option>
          <option value="EndedWithSales"> EndedWithSales</option>
          <option value="EndedWithoutSales">EndedWithoutSales
          </option>
        </select>
      </span>
    </nav>
    </div>;
  }
};
