import { M, log, spn } from '../../utils/webutils';

log.config('console', 'basic', 'ALL', 'note-renderer');
spn.config('app');

const pspid = `eBAPIClient`;
let items = [];

const v1 = 'http://svcs.ebay.com/services/search/FindingService/v1'
const v2 = 'http://open.api.ebay.com/shopping';
const s1 = 'http://svcs.sandbox.ebay.com/services/search/FindingService/v1';
const s2 = 'http://open.api.sandbox.ebay.com/shopping';
const f1 = 'file://User/administrator/Downloads'

const appid = process.env.app_id;
const sbxid = process.env.sbx_id;

export default {
  request(action, response) {
    log.info(`${pspid}> Request: ${action}`);
    switch(action) {
      case 'writeItemsByKeywords':
      //  return new Promise(resolve => {
      //    FS.request(f1, response, obj => {
      //      resolve(obj);
      //    });
      //  });
      case 'findItemsByKeywords':
        return new Promise(resolve => {
          JSONP.request(v1, response, obj => {
            resolve(obj);
          });
        });
      case 'findCompletedItems':
        return new Promise(resolve => {
          JSONP.request(v1, response, obj => {
            resolve(obj);
          });
        });
      case 'findItemsByProduct':
        return new Promise(resolve => {
          JSONP.request(v1, response, obj => {
            resolve(obj);
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
  putItems(options, pages) {
    return this.request('writeItemsByKeywords'
      , { options, pages, operation: 'writeItemsByKeywords'});
  },
  writeItems(options, pages) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.forItems(options, pages)
      .then(this.resItems)
      .then(this.setItems)
      .then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  forItems(options, pages) {
    const newItems = [];
    for(let idx=0; idx < pages; idx++) {
      newItems.push(this.getItems(options, idx));
    }
    return Promise.all(newItems);
  },
  getItems(options, page) {
    return this.request('findItemsByKeywords'
      , this.optItems({
        appid, page, operation: 'findItemsByKeywords'
      }, options));
  },
  getCompletedItems(options, page) {
    return this.request('findCompletedItems'
      , this.optItems({
        appid, page, operation: 'findCompletedItems'
      }, options));
  },
  getProductItems(options, page) {
    return this.request('findItemsByProduct'
      , this.optProduct({
        appid, page, operation: 'findItemsByProduct'
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
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  fetchCompletedItems(options, page) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getCompletedItems(options, page)
      .then(this.resCompletedItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  fetchProductItems(options, page) {
    log.trace(`${pspid}>`,'options:', options);
    log.trace(`${pspid}>`,'page:', page);
    spn.spin();
    return this.getProductItems(options, page)
      .then(this.resProductItems)
      .then(this.setItems)
      //.then(R.tap(this.traceLog.bind(this)))
      .catch(this.errorLog.bind(this));
  },
  resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') 
      ? obj.findItemsByKeywordsResponse[0] : null;
  },
  resCompletedItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') 
      ? obj.findCompletedItemsResponse[0] : null;
  },
  resProductItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') 
      ? obj.findItemsByProductResponse[0] : null;
  },
  setItems(obj) {
    return  obj && obj.ack[0] === 'Success'
      ? obj.searchResult[0].item : null;
  },
  optProduct(o, p) {
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

    if(_p.productId && _p.productType) {
      options['productId'] = _p.productId;
      options['productId.@type'] = _p.productType;
    } else {
      options['productId'] = '';
      options['productId.@type'] = '';
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
  optItems(o, p) {
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

    if(_p.soldItemOnly === true) {
      options['itemFilter(' +n+ ').name'] = 'SoldItemOnly';
      options['itemFilter(' +n+ ').value(0)'] = 'true';
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
