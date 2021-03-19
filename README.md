# lnd_graph_crawl

Find suitable lightning nodes to connect, based on distance, channels, capacity, bos score and liveliness

# usage

```node lnd_graph_crawl.js ALIAS|PUB_KEY (min_channels) (min_capacity_btc) (active_days) (lnd describegraph.json) (bos score file export.json)```

The only mandatory parameter is the `ALIAS` or `PUB_KEY` from your own node.

Other parameters, in order:

`min_channels`: filter for minimum number of channels. Default: 5
`min_capacity_btc`: filter for minimum capacity in BTC. Default: 0.1
`active_days`: filter for last seen activity, in days. Default: 7
`describegraph.json`: override for the lnd describegraph file.
`export.json`: override for the BOS score file.

# requirements

Node.js.

It needs the lightning network graph as described by your node:

```lncli describegraph > describegraph.json```

Optional, it can also use the BOS score list from jorijn:

```wget https://bos.lightning.jorijn.com/data/export.json```

# dependencies

None.
