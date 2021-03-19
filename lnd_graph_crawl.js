const fs = require('fs');

const nodes = [];
const now = Date.now();

if (process.argv.length == 2) {
  help();
  return;
}
const alias = process.argv[2];
const min_channels = process.argv.length >= 4 ? Number(process.argv[3]) : 5;
const min_capacity = process.argv.length >= 5 ? process.argv[4] : 0.1;
const days_active = process.argv.length >= 6 ? process.argv[5] : 7;
const graph_file = process.argv.length >= 7 ? process.argv[6] : 'describegraph.json';
if (!fs.existsSync(graph_file)) {
  help(`Node graph file not found: ${graph_file}`);
  return;
}

var pub_key;
const graph = JSON.parse(fs.readFileSync(graph_file));
for (var node of graph.nodes) {
  nodes[node.pub_key] = {
    ...node,
    channels: 0,
    capacity: 0,
    bos: 0,
    edges: [] 
  }
  if (node.alias == alias || node.pub_key == alias) {
    pub_key = node.pub_key;
  }
}

for (var edge of graph.edges) {
  nodes[edge.node1_pub].channels++;
  nodes[edge.node1_pub].capacity += Number(edge.capacity);
  nodes[edge.node1_pub].edges.push(edge.node2_pub);

  nodes[edge.node2_pub].channels++;
  nodes[edge.node2_pub].capacity += Number(edge.capacity);
  nodes[edge.node2_pub].edges.push(edge.node1_pub);
}

var bos_file = 'export.json';
if (process.argv.length >= 8) {
  bos_file = process.argv[7];
  if (!fs.existsSync(bos_file)) {
    help(`BOS export file not found: ${bos_file}`);
    return;
  }
}

if (fs.existsSync(bos_file)) {
  const bosnodes = JSON.parse(fs.readFileSync(bos_file));
  for (var bos of bosnodes.data) {
    var node = nodes[bos.publicKey];
    if (node) {
      node.bos = bos;
    }
  }
} else {
  console.log(`WARNING: BOS export file not found: ${bos_file}`);
}

if (!pub_key) {
  help(`ALIAS or PUB_KEY not found: ${alias}`);
  return;
}

var distance = 0;

logNode(pub_key);
console.log();

const cache = [];
cache[0] = [pub_key];
const known_nodes = new Set();
known_nodes.add(pub_key);



do {
  distance++;
  cache[distance] = [];
  for (var current of cache[distance-1]) {
    for (var edge of nodes[current].edges) {
      if (!known_nodes.has(edge)) {
        known_nodes.add(edge);
        cache[distance].push(edge);

        if (distance > 1) {
          logNode(edge);
        }
      }
    }
  }
} while (cache[distance].length > 0)

function logNode(pub_key) {
  var node = nodes[pub_key];
  var channels = node.channels;
  var capacity = node.capacity / 1e8;
  var last_update = new Date(node.last_update * 1000);
  var bos_score = node.bos ? ` (bos ${node.bos.score} cap ${node.bos.rankCapacity} cha ${node.bos.rankChannelCount} age ${node.bos.rankAge} gro ${node.bos.rankGrowth} ava ${node.bos.rankAvailability})` : '';
  if ((last_update != '' && channels > min_channels && capacity > min_capacity) || bos_score != '') {
    var days = Math.floor((now - last_update.getTime()) / 1000 / 60 / 60 / 24);
    if (days < days_active) {
      console.log(`${pub_key}  distance: ${distance}  channels: ${String(channels).padStart(4, ' ')}  capacity: ${(capacity).toFixed(2).padStart(6, ' ')}  ${last_update.toISOString().substring(0,10)}  ${node.alias}${bos_score}`);
    }
  }
}

function help(error) {
  console.log('lnd_graph_crawl.js');
  console.log();
  console.log('node lnd_graph_crawl.js ALIAS|PUB_KEY (min_channels) (min_capacity_btc) (active_days) (lnd describegraph.json) (bos score file export.json)');
  console.log();
  console.log('Find suitable lightning nodes to connect, based on distance, channels, capacity, bos score and liveliness');
  console.log();
  console.log('Get node graph from your lightning node:');
  console.log('lncli describegraph > describegraph.json');
  console.log();
  console.log('Optional, get bos score list from jorijn:');
  console.log('wget https://bos.lightning.jorijn.com/data/export.json');
  if (error) {
    console.log();
    console.log(`ERROR: ${error}`);
  }
}