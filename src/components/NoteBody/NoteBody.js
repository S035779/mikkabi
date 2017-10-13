import React from 'react';
import { log } from '../../../utils/webutils';

const pspid = `NoteBodyView`;

export default class NoteBody extends React.Component {
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
    const items = this.props.items
      ? this.props.items.map(item =>
          this.renderItem(item.Item.ResultSet.Result))
      : null;
    return <div className="pane">
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
    </div>;
  }
}
