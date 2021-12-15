export const CONNECT_SOCKET = 'CONNECT_SOCKET';

const addSocket = (dispatch, socket) => {
  let action = {
    type: CONNECT_SOCKET,
    value: socket,
  };

  if (socket)
    dispatch(action);
};

export { addSocket };