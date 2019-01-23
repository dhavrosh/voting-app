const resultsNode = document.querySelector('#results');
const colors = ['blue', 'red', 'white'];

const updateResults = data => {
  if (resultsNode) {
    clearNode(resultsNode);

    const results = JSON.parse(data);

    const votesCount = results.reduce((acc, item) => acc + item.count, 0);

    const resultsWithStats = results.map((item, index) => ({ 
      ...item, 
      color: colors[index],
      part: getPercentOf(votesCount, item.count) }));

    resultsWithStats.forEach(item => {
      const resultsItem = createResultNode(item);
      resultsNode.appendChild(resultsItem);
    }); 
  }

  console.log(data);
};

const getPercentOf = (a, b) => (b * 100) / a;

const clearNode = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  return node;
}

const createResultNode = result => {

  const { candidate_id, part, color } = result;

  const container = document.createElement('div');
  const title = createTitleNode(candidate_id);
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