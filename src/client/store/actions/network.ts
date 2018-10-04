export const addRequest = payload => ({
  type: 'ADD_REQUEST',
  payload,
});

export const clearRequests = () => ({
  type: 'CLEAR_REQUESTS',
});
