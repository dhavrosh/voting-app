const socket = io('http://localhost', { path: '/socket.io' });

const resultsNode = document.querySelector('#results');

const updateResults = results => resultsNode && (resultsNode.innerHTML = results);

socket.on('results', updateResults);