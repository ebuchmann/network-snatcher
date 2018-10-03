const defaultState = () => ({
  selectedRequest: null,
  selectedTab: 'response',
});

const ui = (state = defaultState(), { type, payload }) => {
  switch (type) {
    case 'SET_REQUEST': {
      return { ...state, selectedRequest: payload.id };
    }
    case 'SET_TAB': {
      return { ...state, selectedTab: payload.tab };
    }
    default:
      return state;
  }
};

export default ui;
