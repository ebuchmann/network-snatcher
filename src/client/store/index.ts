import { store as easyStore } from 'react-easy-state';

export interface Request {
  id: string;
  request: {
    hostname: string;
    method: string;
    path: string;
    port: number;
  };
  response: {
    data: any;
    headers: any;
    statusCode: number;
  };
  startTime: number;
  endTime: number | null;
}

const store = easyStore({
  // Network items
  requests: {} as { [id: string]: Request },
  addRequest(request: Request) {
    store.requests[request.id] = request;
  },
  clearRequests() {
    store.requests = {};
  },

  // Interface items
  selectedRequest: '',
  selectedTab: 'response',
  hostFilter: '',
  setUiItem(name: string, value: string) {
    store[name] = value;
  },
});

export default store;
