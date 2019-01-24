const resultsNode = document.querySelector('#results');
const colors = ['blue', 'red', 'white'];

console.log('data', data);

const updateResults = data => {
  if (resultsNode && data.length > 0) {
    clearNode(resultsNode);

    const results = JSON.parse(data);

    const votesCount = results.reduce((acc, item) => acc + item.count, 0);

    const resultsWithStats = results.map((item, index) => ({ 
      color: colors[index],
      name: getCandidateName(item.candidate_id),
      part: getPercentOf(votesCount, item.count) 
    }));

    resultsWithStats.forEach(item => {
      const resultsItem = createResultNode(item);
      resultsNode.appendChild(resultsItem);
    }); 
  }
};

const getCandidateName = id => {
  const candidate = Array.isArray(data) && data.find(({ _id }) => _id === id);

  return candidate && candidate.fullName;
}

const getPercentOf = (a, b) => (b * 100) / a;

const clearNode = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
}

const createResultNode = result => {

  const { name, part, color } = result;

  const container = document.createElement('div');
  const title = createTitleNode(name);
  const progress = createProgressNode(part, color);

  container.appendChild(title);
  container.appendChild(progress);

  return container;
}

const createTitleNode = text => {
  const h = document.createElement('h2');
  const t = document.createTextNode(text);
  
  h.appendChild(t);

  return h;
}

const createProgressNode = (value, color) => {
  const container = document.createElement('div');
  container.className = `meter nostripes animate ${color}`;

  const span = document.createElement('span');
  span.style = `width: ${value}%`;

  container.appendChild(span);

  return container;
}

const socket = io('http://localhost', { path: '/socket.io' });

socket.on('results', updateResults);