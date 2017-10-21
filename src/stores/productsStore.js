import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `noteStore`;

class ProductsStore extends ReduceStore {
  getInitialState() {
    return {
      page:      0 
      , items:   null
      , options: {
        productId: ''
        , productType: ''
        , pages: 10
        , highestPrice: ''
        , lowestPrice: ''
        , shipping: []
        , condition: []
        , status: []
        , itemId: []
        , categoryPath: []
        , seller: [] }
      , url:     ''
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch':
        return Object.assign({}, state
          , { items: action.items, options: action.options
            , page: action.page });
      default:
        return state;
    }
  }
}

export default new ProductsStore(dispatcher);
