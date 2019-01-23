const socket = io('http://localhost', { path: '/socket.io' });

socket.on('results', console.log);