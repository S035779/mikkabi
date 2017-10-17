import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `completeStore`;

class CompleteStore extends ReduceStore {
  getInitialState() {
    return {
      page:      0 
      , items:   null
      , options: {
        searchString: ''
        , highestPrice: ''
        , lowestPrice: ''
        , shipping: []
        , condition: []
        , status: []
        , itemId: []
        , categoryPath: []
        , seller: []
        , soldItemOnly: false }
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

export default new CompleteStore(dispatcher);
