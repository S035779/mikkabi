import { M, log, spn } from '../../utils/webutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `eBAPIClient`;
let items = [];

const v1 = 'http://svcs.ebay.com/services/search/FindingService/v1'
const v2 = 'http://open.api.ebay.com/shopping';
const s1 = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
const s2 = 'http://open.api.sandbox.ebay.com/shopping';

const appid = process.env.app_id;
const redirect_uri = process.env.redirect_uri;

export default {
  request(action, response) {
    log.info(`${pspid}> Request: ${action}`);
    switch(action) {
      case 'findItemsByKeywords':
        return new Promise(resolve => {
          JSONP.request(v1, response, Items => {
            resolve(Items.findItemsByKeywordsResponse[0]
              .searchResult[0].item);
          });
        });
      case 'findCompletedItems':
        return new Promise(resolve => {
          JSONP.request(v1, response, Items => {
            resolve(Items.findCompletedItemResponse[0]
              .searchResult[0].item);
          });
        });
      case 'findItemsByProduct':
        return new Promise(resolve => {
          JSONP.request(v1, response, Items => {
            resolve({
              ProductID: response.ProductID
              , Items: Items.findItemsByProductResponse[0]
                .searchResult[0].item
            });
          });
        });
      case 'FindProducts':
        return new Promise(resolve => {
          JSONP.request(v2, response, Products => {
            resolve({
              ProductID: response.ProductID
              , Products: Products.FindProductsResponse[0]
                .searchResult[0].item
            });
          });
        });
      default:
        return new Promise(resolve => {
          log.warn(`${pspid}> Unknown request !!`);
          resolve(response);
        });
    }
  },
  getItems(options, page) {
    log.trace(`${pspid}>`,'Request:', options);
    return this.request('findItemsByKeywords'
      , this.helperOptions({
        appid, page, operation: 'findItemsByKeywords'
      }, options));
  },
  getCompletedItems(options, page) {
    return this.request('findCompletedItems'
      , this.helperOptions({
        appid, page, operation: 'findCompletedItems'
      }, options));
  },
  getProductItems(productID, page) {
    return this.request('findItemsByProduct'
      , this.helperOptions({
        productID, appid, page, operation: 'findItemsByProduct'
      }, options));
  },
  getProducts(productID) {
    return this.request('FindProducts'
      , this.helperOptions({
        productID, appid, operation: 'FindProducts'
      }, options));
  },
  fetchItems(options, page) {
    spn.spin();
    return this.getItems(options, page)
      .then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  helperOptions(o, p) {
    const _o = o;
    const _p = p ? p : {};
    const options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['paginationInput.entriesPerPage'] = 20;
    options['paginationInput.pageNumber'] = _o.page;
    options['outputSelector'] = 'SellerInfo';

    options['keywords'] = _p.searchString
      ? _p.searchString : undefined;
    options['itemFilter(0).name']
      = _p.seller && _p.seller.length
      ? 'Seller'        : undefined;
    options['itemFilter(0).value(0)']
      = _p.seller && _p.seller.length
      ? _p.seller       : undefined;
    options['itemFilter(1).name']
      = _p.highestPrice
      ? 'MaxPrice'      : undefined;
    options['itemFilter(1).value(0)']
      = _p.highestPrice
      ? _p.highestPrice : undefined;
    options['itemFilter(2).name']
      = _p.lowestPrice 
      ? 'MinPrice'      : undefined;
    options['itemFilter(2).value(0)']
      = -p.lowestPrice
      ? _p.lowestPrice  : undefined;
    options['itemFilter(3).name']
      = _p.condition && _p.condition !== 'ALL'
      ? 'Condition'     : undefined;
    options['itemFilter(3).value(0)']
      = _p.condition && _p.condition !== 'ALL'
      ? _p.condition    : undefined;
    
    log.trace(`${pspid}>`, 'fetchIds options:', options);
    return options;
  },
  traceLog(obj) {
    return log.trace(`${pspid}>`, 'Trace log:', obj);
  },
  errorLog(err) {
    return log.error(`${pspid}>`, 'Error occurred:', err);
  },
}
