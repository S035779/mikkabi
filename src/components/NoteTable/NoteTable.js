import React from 'react';
import Sparkline from '../../components/Sparkline/Sparkline';
import std from '../../../utils/stdutils';
import { log } from '../../../utils/webutils';

const pspid = `NoteTableView`;

export default class NoteTable extends React.Component {
  renderStatus(status) {
    let styles;
    switch(status) {
      case 0:
        styles = { fontWeight:'bold', color: 'blue' };
        return <div style={styles}>Now available.</div>;
      case 1:
        styles = { fontWeight:'bold', color: 'orange' };
        return <div style={styles}>New added.</div>;
      case 2:
        styles = { fontWeight:'bold', color: 'red' };
        return <div style={styles}>Removed.</div>;
    }
  };

  renderExtension(date) {
    return <div>( { date } )</div>;
  }

  renderBids(bids) {
    if(!bids) return null;
    const points = Array.isArray(bids)
      ? bids.map(obj => parseInt(obj.Price, 10))
      : [ parseInt(bids.Price, 10) ];
    return <Sparkline points={points} />
  }
  
  renderItem(obj) {
    const item = obj;
    const Img = item.galleryURL[0] ? item.galleryURL[0] : '';
    const Aid = item.itemId[0];
    const Sid = item.sellerInfo[0].sellerUserName[0];
    const Stm
      = std.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    const Etm
      = std.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
    const Url = item.viewItemURL[0];
    const Ttl = item.title[0];
    const Pc1 = item.sellingStatus[0]
      .currentPrice[0].__value__;
    const Ci1 = item.sellingStatus[0]
      .currentPrice[0]['@currencyId'];
    const Pc2 = item.sellingStatus[0]
      .convertedCurrentPrice[0].__value__;
    const Ci2 = item.sellingStatus[0]
      .convertedCurrentPrice[0]['@currencyId'];
    const Cdn = item.condition[0].conditionDisplayName[0];
    const Cgp = item.primaryCategory[0].categoryName[0];
    const Shp = item.shippingInfo[0].shipToLocations[0];
    const Stt = item.sellingStatus[0].sellingState[0];
    const Ext
      = this.renderExtension(item.sellingStatus[0].timeLeft[0]);
    const stt = this.renderStatus(0);
    const Upd = std.getLocalTimeStamp(Date.now());

    return <tbody key={Aid}><tr>
      <td><img src={Img} width='128' height='128' /></td>
      <td><span>
        <a href={Url} target='_blank'>{Ttl}</a><br />
        </span>
        <span>
        Sell period : {Stm} ~ {Etm}<br />
        Condition : {Cdn}<br />
        Seller : {Sid}<br />
        ItemID : {Aid}<br />
        Category : {Cgp}
      </span></td>
      <td>{Shp}</td>
      <td>
        <span>{Pc1} {Ci1}</span><br />
        <span>( {Pc2} {Ci2} )</span>
      </td>
      <td><span>{Stt}</span><br /><span>{Ext}</span></td>
      <td><span>{stt}</span><br /><span>{Upd}</span></td>
    </tr></tbody>;
  }

  filterItems(objs, options) {
    return objs.filter(obj => { 
      const item = obj;
      if(options != null) {
        if(!item.title[0].match(options.searchString)
          && options.searchString !== '') 
          return false;
        if(options.shipping !== 'ALL'
          && options.shipping !== item.shippingInfo[0]
            .shipToLocations[0]) 
          return false;
        if(options.condition !== 'ALL'
          && options.condition !== item.condition[0]
            .conditionDisplayName[0])
          return false;
        if(options.status !== 'ALL'
          && options.status !== item.sellingStatus[0]
            .sellingState[0])
          return false;
        if(!options.categoryPath.some(path => {
          return path === item.primaryCategory[0]
            .categoryName[0]; })
          && options.categoryPath.length !== 0 )
          return false;
        if(!options.seller.some(selr => { 
          return selr === item.sellerInfo[0]
            .sellerUserName[0]; })
          && options.seller.length !== 0 )
          return false;
        if(!options.itemId.some(auid => { 
          return auid === item.itemId; })
          && options.itemId.length !== 0 )
          return false;
        if(!isFinite(options.lowestPrice) 
          || !isFinite(options.highestPrice))
          return false;
        if(Number(options.lowestPrice) > item.sellingStatus[0]
            .convertedCurrentPrice[0].__value__ 
          && options.lowestPrice !== '')
          return false;
        if(Number(options.highestPrice) < item.sellingStatus[0]
            .convertedCurrentPrice[0].__value__ 
          && options.highestPrice !== '')
          return false;
      }
      return true;
    });
  }

  render() {
    const options = this.props.options;
    const items = this.props.items
      ? this.filterItems(this.props.items, options)
        .map(item => this.renderItem(item))
      : null;
    return <div className="pane">
      <table className="table-striped">
      <thead><tr>
      <th>Image</th>
      <th>Detail</th>
      <th>Shipping</th>
      <th>Price</th>
      <th>Status</th>
      <th>Update</th>
      </tr></thead>
      {items}
      </table>
    </div>;
  }
};

