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
}

const network = (state = {}, { type, payload }) => {
  switch (type) {
    case 'ADD_REQUEST': {
      const { id } = payload;
      return { ...state, ...{ [id]: payload } };
    }
    default:
      return state;
  }
};

export default network;
