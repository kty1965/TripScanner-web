import config from '../../config';

// For api/v1/trips
export const REQUEST_SEARCH_TRIP = 'REQUEST_SEARCH_TRIP';
export const RECEIVE_SEARCH_TRIP = 'RECEIVE_SEARCH_TRIP';

const tripsSearchUrl = `${config.apiServer.host}/trips`

// For api/v1/trips/joined
export const REQUEST_JOINED_TRIP = 'REQUEST_JOINED_TRIP';
export const RECEIVE_JOINED_TRIP = 'RECEIVE_JOINED_TRIP';

const joinedTripUrl = `${config.apiServer.host}/trips/joined`

// For api/v1/trips/owned
export const REQUEST_HOSTED_TRIP = 'REQUEST_HOSTED_TRIP';
export const RECEIVE_HOSTED_TRIP = 'RECEIVE_HOSTED_TRIP';

const hostedTripUrl = `${config.apiServer.host}/trips/owned`

function requestSearchTrip(query) {
  return {
    type: REQUEST_SEARCH_TRIP,
    query
  };
}

function receiveSearchTrip(json) {
  return {
    type: RECEIVE_SEARCH_TRIP,
    trips: json.trips
  };
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&');
}

function requestJoinedTrip() {
  return {
    type: REQUEST_JOINED_TRIP
  }
}

function receiveJoinedTrip(json) {
  return {
    type: RECEIVE_JOINED_TRIP,
    trips: json.trips
  }
}

function requestHostedTrip() {
  return {
    type: REQUEST_HOSTED_TRIP
  }
}

function receiveHostedTrip(json) {
  return {
    type: RECEIVE_HOSTED_TRIP,
    trips: json.trips
  }
}

export function fetchSearchTrip(query) {
  return dispatch => {
    dispatch(requestSearchTrip(query));
    return fetch(`${tripsSearchUrl}?${getQueryString(query)}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveSearchTrip(json)));
  };
}

export function fetchJoinedTrip() {
  return dispatch => {
    dispatch(requestJoinedTrip())
    return fetch(joinedTripUrl, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveJoinedTrip(json)));
  }
}

export function fetchHostedTrip() {
  return dispatch => {
    dispatch(requestHostedTrip())
    return fetch(hostedTripUrl, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveHostedTrip(json)));
  }
}