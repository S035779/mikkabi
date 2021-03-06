import { dispatch } from '../dispatcher';
import NoteApiClient from '../services/NoteApiClient';
import { spn, log } from '../../utils/webutils';

const pspid = `CompleteAction`;

export default {
  increment(options, page) {
    log.trace(`${pspid}>`, options);
    page = ++page > 0 ? page : 1;
    return NoteApiClient.fetchCompleteItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/complete', items, options, page });
      log.info(`${pspid}>`, 'Response: item/fetch/complete');
      spn.stop();
    });
  },
  decrement(options, page) {
    page = --page > 0 ? page : 1;
    return NoteApiClient.fetchCompleteItems(options, page)
    .then(items => {
      dispatch({ type: 'item/fetch/complete', items, options, page });
      log.info(`${pspid}> Response: item/fetch/complete`);
      spn.stop();
    });
  },
  writeCompleteItems(options) {
    return NoteApiClient.writeCompleteItems(options)
    .then(() => {
      dispatch({ type: 'item/write/complete', options});
      log.info(`${pspid}> Response: item/write/complete`);
      spn.stop();
    });
  },
}
