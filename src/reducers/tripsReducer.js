import {
  RECEIVE_SEARCH_TRIP, REQUEST_SEARCH_TRIP,
  RECEIVE_JOINED_TRIP, REQUEST_JOINED_TRIP,
  RECEIVE_HOSTED_TRIP, REQUEST_HOSTED_TRIP,
  REQUEST_TRIP_SHOW, RECEIVE_TRIP_SHOW
} from '../actions/tripsAction';

export function tripsReducer(state = {
  isFetching: false,
  trips: null,
  trip: null
}, action) {
  switch (action.type) {
    case REQUEST_JOINED_TRIP:
    case REQUEST_HOSTED_TRIP:
    case REQUEST_SEARCH_TRIP:
    case REQUEST_TRIP_SHOW:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_JOINED_TRIP:
    case RECEIVE_HOSTED_TRIP:
    case RECEIVE_SEARCH_TRIP:
      return Object.assign({}, state, {
        isFetching: false,
        trips: action.trips
      });
    case RECEIVE_TRIP_SHOW:
      return Object.assign({}, state, {
        isFetching: false,
        trip: action.trip
      });
    default:
      return state;
  }
}