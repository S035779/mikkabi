import React from 'react';
import { Container } from 'flux/utils';
import ContainerConverter from '../../FluxContainerConverter';
import appStore from '../../stores/appStore';
import AppAction from '../../actions/AppAction';
import Button from '../../components/Button/Button';
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

    return <li key={Aid}>
      <table width="100%"><tbody><tr>
      <td width="10%">
        <img src={Img} width='128' height='128' /></td>
      <td width="40%"><span>
        <a href={Url} target='_blank'>
        {Ttl}</a><br /></span>
      <span>
        Bid period : {Stm} ~ {Etm}<br />
        Condition : {Cdn}<br />
        Seller : {Sid}<br />
        AuctionID : {Aid}<br />
        Category : {Cgp}</span></td>
      <td width="10%"><span>
      {Prc} yen
      </span></td>
      <td width="10%"><span>
      {Bid} bids
      </span></td>
      <td width="10%"><span>
      {Stt}
      </span></td>
      <td width="10%"><span>
      {Ext==='true' ? 'with Auto Extension' : ''}
      </span></td>
      <td width="10%"><span>
      Now available.
      </span></td>
      </tr></tbody></table>
    </li>;
  }

  render() {
    log.trace(`${pspid}> page`, this.state.page);
    const page = this.state.page;
    const items = this.state.items
      ? this.state.items.map(item =>
          this.renderItem(item.Item.ResultSet.Result))
      : null;
    return <div><h2>Hello, World!</h2>
      <Button onClick={this.handleIncrement.bind(this)}>
      +</Button>
      <Button onClick={this.handleDecrement.bind(this)}>
      -</Button>
      <div>{page} page</div>
      <ul>{items}</ul>
      </div>;
  }
}
export default Container.create(ContainerConverter.convert(App));
