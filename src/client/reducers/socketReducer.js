import { CONNECT_SOCKET } from "../actions/socketAction";

const initialSocketState = {
  socket: undefined,
};

const socketReducer = (state = initialSocketState, action) => {
  let nextState;

  switch (action.type) {
    case CONNECT_SOCKET:
      nextState = {
        ...state,
        socket: action.value,
      };
      return (nextState);
    default:
      return (state);
  }
};

export { socketReducer, initialSocketState };
export default socketReducer;