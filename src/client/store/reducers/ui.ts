const defaultState = () => ({
  selectedRequest: null,
  selectedTab: 'response',
  hostFilter: '',
});

const ui = (state = defaultState(), { type, payload }) => {
  switch (type) {
    case 'SET_REQUEST': {
      return { ...state, selectedRequest: payload.id };
    }
    case 'SET_TAB': {
      return { ...state, selectedTab: payload.tab };
    }
    case 'SET_FILTER': {
      return { ...state, hostFilter: payload.text };
    }
    default:
      return state;
  }
};

export default ui;
