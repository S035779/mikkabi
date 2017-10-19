import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `ProductsAction`;

export default {
  increment(options, page) {
    log.trace(`${pspid}>`, options);
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchProductItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch', items, options, page });
      log.info(`${pspid}>`, 'Response: item/fetch');
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchProductItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch', items, options, page });
      log.info(`${pspid}> Response: item/fetch`);
      spn.stop();
    });
  },
  writeItems(options, pages) {
    return NoteApiClient.writeItems(options, pages)
    .then(() => {
      dispatch({ type: 'item/write', options, pages});
      log.info(`${pspid}> Response: item/write`);
      spn.stop();
    });
  },
}
