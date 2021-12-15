import Master from './classes/Master.js';

let master = new Master();
master.startServer().then(() => console.log('server ready')).catch(() => console.log('server launch error'));

export default master;