const defaultReq = (socket, objToSend) => {
  return (new Promise((res, rej) => {
    if (socket && socket.connected && socket.id) {
      socket.emit('defaultReq', objToSend, (reponse) => {
        if (reponse && reponse.type === 'ok')
          res(reponse.value);
        else
          rej(reponse.value);
      });
    }
    else
      rej('socket not connected');
  }));
};

export default { defaultReq };