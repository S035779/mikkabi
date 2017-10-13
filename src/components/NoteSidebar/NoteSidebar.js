import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `NoteSidebarView`;

export default class NoteHeader extends React.Component {
  render() {
    return <div className="pane pane-sm sidebar">
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
    </div>;
  }
}
