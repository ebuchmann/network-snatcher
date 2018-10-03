export const setRequest = (id: string) => ({
  type: 'SET_REQUEST',
  payload: {
    id,
  },
});

export const setTab = (tab: string) => ({
  type: 'SET_TAB',
  payload: {
    tab,
  },
});
