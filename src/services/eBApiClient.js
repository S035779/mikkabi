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
          JSONP.request(v1, response, obj => {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise(resolve => {
          JSONP.request(v1, response, obj => {
            resolve(obj
              ? obj.findCompletedItemResponse[0]
                .searchResult[0].item
              : null);
          });
        });
      case 'findItemsByProduct':
        return new Promise(resolve => {
          JSONP.request(v1, response, obj => {
            resolve(obj
              ? { ProductID:  response.ProductID
                , Items:      obj.findItemsByProductResponse[0]
                  .searchResult[0].item }
              : null);
          });
        });
      case 'FindProducts':
        return new Promise(resolve => {
          JSONP.request(v2, response, obj => {
            resolve(obj
              ? { ProductID: response.ProductID
                , Products: obj.FindProductsResponse[0]
                  .searchResult[0].item }
              : null);
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
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getItems(options, page)
      .then(this.resItems)
      .then(R.tap(this.traceLog.bind(this)))
      .then(this.setItems)
      .catch(this.errorLog.bind(this));
  },
  resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') 
      ? obj.findItemsByKeywordsResponse[0] : null;
  },
  setItems(obj) {
    return  obj && obj.ack[0] === 'Success'
      ? obj.searchResult[0].item : null;
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
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 20;
    options['paginationInput.pageNumber'] = _o.page;

    if(_p.searchString) {
      options['keywords'] = _p.searchString;
    } else {
      options['keywords'] = '';
    }

    let n = 0;
    if(_p.seller && _p.seller.length) {
      options['itemFilter(' +n+ ').name'] = 'Seller';
      _p.seller.forEach((slr, idx) =>
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = slr);
      n++;
    }

    if(_p.highestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MaxPrice';
      options['itemFilter(' +n+ ').value(0)']
        = _p.highestPrice;
      n++;
    }

    if(_p.lowestPrice) {
      options['itemFilter(' +n+ ').name'] = 'MinPrice';
      options['itemFilter(' +n+ ').value(0)'] = _p.lowestPrice;
      n++;
    }
    
    if(_p.condition && _p.condition.length) {
      options['itemFilter(' +n+ ').name'] = 'Condition';
      _p.condition.forEach((cdn, idx) => 
        options['itemFilter(' +n+ ').value(' +idx+ ')'] = cdn);
      n++;
    }
    
    log.trace(`${pspid}>`, 'Request:', options);
    return options;
  },
  traceLog(obj) {
    return log.trace(`${pspid}>`, 'Trace log:', obj);
  },
  errorLog(err) {
    return log.error(`${pspid}>`, 'Error occurred:', err);
  },
}
