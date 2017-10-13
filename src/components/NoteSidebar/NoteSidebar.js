import React from 'react';
import Radio from '../Radio/Radio';
import { log } from '../../../utils/webutils';
import std from '../../../utils/stdutils';

const pspid = `NoteSidebarView`;

export default class NoteSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.options)
  }

  handleClickSearch(e) {
    e.prevent.Default();
    this.props.onSearch(this.state)
  }

  handleClickReset() {
    this.setState({
      searchString: ''
      , highestPrice: ''
      , lowestPrice: ''
      , bids: false
      , condition: 'all'
      , status: false
      , AuctionID: []
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
    const len = arguments.length;
    if(!objs) return null;
    const items = objs.map(obj => {
      if(!obj.Item.hasOwnProperty('ResultSet')) return null;
      return (len === 2)
        ? obj.Item.ResultSet.Result[prop1]
        : obj.Item.ResultSet.Result[prop1][prop2];
    })
    const opts = std.dst(items);
    return opts.map((opt, idx) => {
      return <option
        key={"choice-" + idx} value={opt} >{opt}</option>;
    })
  }

  render() {
    const optAuIDs = this.renderOption(this.props.items
      , 'AuctionID');
    const optPaths = this.renderOption(this.props.items
      , 'CategoryPath');
    const optSelrs = this.renderOption(this.props.items
      , 'Seller', 'Id');
    return <div className="pane pane-sm sidebar">
    <nav className="nav-group">
      <h5 className="nav-group-title">Title</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          placeholder="Search of items"
          onChange={
            this.handleChangeText.bind(this, 'searchString')
          }/>
        </div>
      </span>
      <h5 className="nav-group-title">Category</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.categoryPath}
          onChange={
            this.handleChangeSelect.bind(this, 'categoryPath')
          }>
          {optPaths}
        </select>
      </span>
      <h5 className="nav-group-title">Seller</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.seller}
          onChange={this.handleChangeSelect.bind(this, 'seller')}
        >
          {optSelrs}
        </select>
      </span>
      <h5 className="nav-group-title">AuctionID</h5>
      <span className="nav-group-item">
        <select className="form-control"
          multiple={true}
          value={this.state.AuctionID}
          onChange={
            this.handleChangeSelect.bind(this, 'AuctionID')
          }>
          {optAuIDs}
        </select>
      </span>
      <h5 className="nav-group-title">Price</h5>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          value={this.state.highestPrice} 
          placeholder="Highest price" 
          onChange={
            this.handleChangeText.bind(this, 'highestPrice')
          } />
        </div>
      </span>
      <span className="nav-group-item">
        <div className="form-group">
        <input type="text"
          className="form-control"
          value={this.state.lowestPrice} 
          placeholder="Lowest price" 
          onChange={
            this.handleChangeText.bind(this, 'lowestPrice')
          } />
        </div>
      </span>
      <h5 className="nav-group-title">Bids</h5>
      <span className="nav-group-item">
        <div className="checkbox">
        <label><input type="checkbox" 
        value="bids" 
        checked={this.state.bids} 
        onChange={
          this.handleChangeCheckbox.bind(this, 'bids')
        } />bids only.
        </label>
        </div>
      </span>
      <h5 className="nav-group-title">Condition</h5>
      <span className="nav-group-item">
        <div className="radio">
        <Radio name="condition"
          value={this.state.condition}
          onChange={
            this.handleChangeRadio.bind(this, 'condition')
          }>
          <option value="all">all</option>
          <option value="new">new</option>
          <option value="used">used</option>
          <option value="other">other</option>
        </Radio>
        </div>
      </span>
      <h5 className="nav-group-title">Status</h5>
      <span className="nav-group-item">
        <div className="checkbox">
        <label><input type="checkbox" 
          value="status" 
          checked={this.state.status} 
          onChange={
            this.handleChangeCheckbox.bind(this, 'status')
          } />open only.
        </label>
        </div>
      </span>
      <h5 className="nav-group-title">Submit</h5>
      <span className="nav-group-item">
      <button className="btn btn-form btn-default">
      Reset
      </button>
      </span>
      <span className="nav-group-item">
      <button className="btn btn-form btn-primary">
      Search
      </button>
      </span>
    </nav>
    </div>;
  }
};
