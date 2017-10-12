import { M, log, spn } from '../../utils/webutils';

log.config('console', 'basic', 'ALL', 'note-client');
spn.config('app');

const pspid = `NoteAPIClient`;
let items = [];

const v1 = 'https://auctions.yahooapis.jp/AuctionWebService/V1/';
const v2 = 'https://auctions.yahooapis.jp/AuctionWebService/V2/';
const a2 = 'https://auth.login.yahoo.co.jp/yconnect/v2/';

const output = 'json';
const result = 50;
const appid = process.env.app_id;
const response_type = 'token';
const redirect_uri = '';
const scope = 'openid';

export default {
  request(action, response) {
    log.info(`${pspid}> Request: ${action}`);
    //log.trace(`${pspid}> Response:`, response);
    switch(action) {
      case 'json/search':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
            console.log(ids);
            resolve(ids);
          });
        });
      case 'json/auctionItem':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, Item => {
            resolve({ AuctionID: response.auctionID, Item });
          });
        });
      case 'BidHistory':
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Bids => {
            resolve({ AuctionID: response.auctionID, Bids });
          });
        });
      case '.well-known/openid-configuration':
        return new Promise(resolve => {
          JSONP.request(a2 + action, response, config => {
            resolve(config);
          });
        });
      case 'authorization':
        return new Promise(resolve => {
          JSONP.request(a2 + action, response, auth => {
            resolve(auth);
          });
        });
      case 'watchList':
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'deleteWatchList':
        return new Promise(resolve => {
          JSONP.request(v1 + action, response, Url => {
            resolve({ AuctionID: response.auctionID, Url });
          });
        });
      case 'openWatchList':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
            resolve(ids);
          });
        });
      case 'closeWatchList':
        return new Promise(resolve => {
          JSONP.request(v2 + action, response, ids => {
            resolve(ids);
          });
        });
      default:
        return new Promise(resolve => {
          log.warn(`${pspid}> Unknown request !!`);
          resolve(response);
        });
    }
  },
  fetchIds(query, page) {
    return this.request('json/search'
      , { query, appid, page, output });
  },
  fetchItem(auctionID) {
    return this.request('json/auctionItem'
      , { auctionID, appid, output });
  },
  fetchBids(auctionID) {
    return this.request('BidHistory'
      , { auctionID, appid, output });
  },
  newIds(obj) {
    return R.map(item => item.AuctionID
      , obj.ResultSet.Result.Item);
  },
  newItems(is, bs) {
    return R.map(i => {
      const b = R.filter(o => o.AuctionID === i.AuctionID, bs);
      return R.merge(i, b[0]);
    }, is);
  },
  traceLog(obj) {
    return log.trace('Trace log:', obj);
  },
  errorLog(err) {
    return log.error('Error occurred:', err);
  },
  isItem(o) {
    return o.hasOwnProperty('Item');
  },
  isBids(o) {
    return o.hasOwnProperty('Bids');
  },
  fetchItems(query, page) {
    spn.spin();
    return this.fetchIds(query, page)
      //.then(R.tap(this.traceLog.bind(this)))
      .then(this.newIds.bind(this))
      .then(M.fork(R.concat
        , R.map(this.fetchItem.bind(this))
        , R.map(this.fetchBids.bind(this))))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.newItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))))
      .catch(this.errorLog.bind(this));
  },
  fetchConfig() {
    return this.request('.well-known/openid-configuration');
  },
  fetchAuth() {
    return this.request('authorization'
      , { response_type
        , client_id: appid
        , redirect_uri
        , scope });
  },
  fetchCloseWatchIds(start, access_token) {
    return this.request('closeWatchList'
      , { start, result, output, access_token });
  },
  fetchCloseWatch(start) {
    spn.spin();
    const newIds = R.curry(this.fetchCloseWatchIds)(start);
    return this.fetchConfig()
      .then(R.tap(this.traceLog.bind(this)))
      .then(this.fetchAuth)
      .then(newIds)
      .then(this.newIds.bind(this))
      .then(M.fork(R.concat
        , R.map(this.fetchItem.bind(this))
        , R.map(this.fetchBids.bind(this))))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.newItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))))
      .catch(this.errorLog.bind(this));
  },
  fetchOpenWatchIds(access_token, start) {
    return this.request('openWatchList'
      , { start, result, output, access_token });
  },
  fetchOpenWatch(query, page) {
    spn.spin();
    return this.fetchOpenWatchIds(query, page)
      .then(this.newIds.bind(this))
      .then(M.fork(R.concat
        , R.map(this.fetchItem.bind(this))
        , R.map(this.fetchBids.bind(this))))
      .then(obj => Promise.all(obj))
      .then(M.fork(this.newItems.bind(this)
        , R.filter(this.isItem.bind(this))
        , R.filter(this.isBids.bind(this))))
      .then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  createWatch(access_token, auctionID) {
    spn.spin();
    return this.request('watchList'
      , { auctionID, output, access_token });
  },
  deleteWatch(access_token, auctionID) {
    spn.spin();
    return this.request('deleteWatchList'
      , { auctionID, output, access_token });
  },
}
