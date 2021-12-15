import _ from 'lodash';

import mainServer from './Servers.js';

export default class Master {
  constructor() {
    this._roomsList = {};
    this._sioClientList = {};
    this._server = {};
  }

  startServer() {
    return (new Promise((res) => {
      this.server = new mainServer(this);
      this.server.startServer(() => {
        this.server.listenSio(this);
        res();
      });
    }));
  }

  stopServer() {
    return (new Promise((res) => {
      this.server.stopListenSio(this.sioClientList);
      this.server.stopServer();
      this.server = undefined;
      res();
    }));
  }

  get server() {
    return (this._server);
  }

  set server(value) {
    this._server = value;
  }

  get roomsList() {
    return (this._roomsList);
  }

  set roomsList(value) {
    this._roomsList = value;
  }

  get sioClientList() {
    return (this._sioClientList);
  }

  set sioClientList(value) {
    this._sioClientList = value;
  }

  getSioHbeat(id) {
    if (this.sioClientList[id])
      return (this.sioClientList[id].hbeat);
  }

  setSioHbeat(id, value) {
    this._sioClientList[id].hbeat = value;
  }

  addNewSio(client) {
    this._sioClientList = { ...this._sioClientList, [client.id]: client };
  }

  removeSio(client) {
    if (this._sioClientList[client] !== undefined) {
      this._sioClientList[client].disconnect();
      delete this._sioClientList[client];
    }
  }

  heartbeat(client) {
    this.setSioHbeat(client.id, Date.now());
    setTimeout(() => {
      let now = Date.now();

      if (now - this.getSioHbeat(client.id) > 5000) {
        // console.log('this client id will be closed ' + client.id);
        let room = this.getRoomFromPlayerId(client.id, this);
        if (room !== undefined)
          this.leaveRoom(client.id, room.url, () => { });
        setTimeout(() => this.removeSio(client), 500);
      }
      now = null;
    }, 6000);
  }
};