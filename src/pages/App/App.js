import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import appStore from '../../stores/appStore';
import AppAction from '../../actions/AppAction';
import { log } from '../../../utils/webutils';

const pspid = `AppControlerView`;
const query = 'コーチ レザー';

class App extends React.Component {
  static getStores() {
    return [appStore];
  }

  static calculateState() {
    return appStore.getState();
  }

  componentDidMount() {
    AppAction.increment(query, this.state.page);
    //AppAction.incrementCloseWatch(this.state.page);
  }

  handleIncrement() {
    log.info(`${pspid}> Request: handleIncrement`);
    //AppAction.increment(query, this.state.page);
    AppAction.incrementCloseWatch(this.state.page);
  }

  handleDecrement() {
    log.info(`${pspid}> Request: handleDecrement`);
    //AppAction.decrement(query, this.state.page);
    AppAction.decrementCloseWatch(this.state.page);
  }

  renderItem(item) {
    const Img = item.Img.Image1;
    const Aid = item.AuctionID;
    const Sid = item.Seller.Id;
    const Stm = item.StartTime;
    const Etm = item.EndTime;
    const Url = item.AuctionItemUrl;
    const Ttl = item.Title;
    const Bid = item.Bids;
    const Prc = item.Price;
    const Cdn = item.ItemStatus.Condition;
    const Cgp = item.CategoryPath;
    const Stt = item.Status;
    const Ext = item.IsAutomaticExtension;

    return <tbody key={Aid}><tr>
      <td>
        <img src={Img} width='128' height='128' />
      </td>
      <td>
        <span>
        <a href={Url} target='_blank'>{Ttl}</a><br />
        </span>
        <span>
        Bid period : {Stm} ~ {Etm}<br />
        Condition : {Cdn}<br />
        Seller : {Sid}<br />
        AuctionID : {Aid}<br />
        Category : {Cgp}
        </span>
      </td>
      <td>

      </td>
      <td>
        <span>{Prc} yen</span><br />
        <span>{Bid} bids</span>
      </td>
      <td>
        <span>{Stt}</span><br />
        <span>{Ext==='true' ? 'with Auto Extension' : ''}</span>
      </td>
      <td>
        <span>Now available.</span><br />
        <span>YYYY-MM-DD HH:MM:SS</span>
      </td>
      </tr></tbody>;
  }

  render() {
    log.trace(`${pspid}> page`, this.state.page);
    const page = this.state.page;
    const items = this.state.items
      ? this.state.items.map(item =>
          this.renderItem(item.Item.ResultSet.Result))
      : null;
    return <div className="window">
    <header className="toolbar toolbar-header">
    <h1 className="title">WatchNote!</h1>
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
    <div className="window-content">
    <div className="pane-group">
    <div className="pane pane-sm sidebar">
      <nav className="nav-group">
        <h5 className="nav-group-title">Title</h5>
        <span className="nav-group-item">
          <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Search of items" />
          </div>
        </span>
        <h5 className="nav-group-title">Category</h5>
        <span className="nav-group-item">
          <select className="form-control">
          <option>Option one</option>
          <option>Option two</option>
          <option>Option three</option>
          <option>Option four</option>
          <option>Option five</option>
          <option>Option six</option>
          <option>Option seven</option>
          <option>Option eight</option>
          </select>
        </span>
        <h5 className="nav-group-title">Seller</h5>
        <span className="nav-group-item">
          <select className="form-control">
          <option>Option one</option>
          <option>Option two</option>
          <option>Option three</option>
          <option>Option four</option>
          <option>Option five</option>
          <option>Option six</option>
          <option>Option seven</option>
          <option>Option eight</option>
          </select>
        </span>
        <h5 className="nav-group-title">AuctionID</h5>
        <span className="nav-group-item">
          <select className="form-control">
          <option>Option one</option>
          <option>Option two</option>
          <option>Option three</option>
          <option>Option four</option>
          <option>Option five</option>
          <option>Option six</option>
          <option>Option seven</option>
          <option>Option eight</option>
          </select>
        </span>
        <h5 className="nav-group-title">Price</h5>
        <span className="nav-group-item">
          <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Highest price" />
          </div>
        </span>
        <span className="nav-group-item">
          <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Lowest price" />
          </div>
        </span>
        <h5 className="nav-group-title">Bids</h5>
        <span className="nav-group-item">
          <div className="checkbox">
          <label><input type="checkbox" />bids only.
          </label>
          </div>
        </span>
        <h5 className="nav-group-title">Condition</h5>
        <span className="nav-group-item">
          <div className="radio">
          <label><input type="radio" name="radios" />all
          </label>
          </div>
          <div className="radio">
          <label><input type="radio" name="radios" />new
          </label>
          </div>
          <div className="radio">
          <label><input type="radio" name="radios" />used
          </label>
          </div>
          <div className="radio">
          <label><input type="radio" name="radios" />other
          </label>
          </div>
        </span>
        <h5 className="nav-group-title">Status</h5>
        <span className="nav-group-item">
          <div className="checkbox">
          <label><input type="checkbox" />open only.
          </label>
          </div>
        </span>
        <h5 className="nav-group-title">Submit</h5>
        <span className="nav-group-item">
          <div className="form-actions">
          <button
            className="btn btn-form btn-default">Resets
          </button>
          </div>
        </span>
        <span className="nav-group-item">
          <div className="form-actions">
          <button
            className="btn btn-form btn-primary">Search
          </button>
          </div>
        </span>
      </nav>
    </div>
    <div className="pane">
      <table className="table-striped">
      <thead><tr>
      <th>Image</th>
      <th>Detail</th>
      <th>Chart</th>
      <th>Bids</th>
      <th>Status</th>
      <th>Update</th>
      </tr></thead>
      {items}
      </table>
    </div>
    </div>
    </div>
    <footer className="toolbar toolbar-footer">
      <div className="toolbar-actions">
      <button className="btn btn-default">Cancel
      </button>
      <button className="btn btn-primary pull-right">Save
      </button>
      </div>
    </footer>
    </div>;
  }
}
export default Container.create(ContainerConverter.convert(App));
