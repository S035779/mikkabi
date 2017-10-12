import { ReduceStore } from 'flux/utils';
import dispatcher from '../dispatcher';
import { log } from '../../utils/webutils';

const pspid = `appStore`;

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      page:     0 
      , query:  ''
      , items:  null
      , url:    ''
    };
  }
  
  reduce(state, action) {
    log.info(`${pspid}> Request: ${action.type}`);
    switch (action.type) {
      case 'item/fetch':
        return Object.assign({}, state
          , { items: action.items, page: action.page });
      case 'item/fetch/closewatch':
        return Object.assign({}, state
          , { items: action.items, page: action.page });
      case 'item/fetch/openwatch':
        return Object.assign({}, state
          , { items: action.items, page: action.page });
      case 'item/create/watch':
        return Object.assign({}, state, { url: action.url });
      case 'item/delete/watch':
        return Object.assign({}, state, { url: action.url });
      default:
        return state;
    }
  }
}

export default new AppStore(dispatcher);
