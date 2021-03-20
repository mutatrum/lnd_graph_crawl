# lnd_graph_crawl

Find suitable lightning nodes to connect, based on distance, channels, capacity, bos score and liveliness

# usage

```node lnd_graph_crawl.js ALIAS|PUB_KEY (min_channels) (min_capacity_btc) (active_days) (lnd describegraph.json) (bos score file export.json)```

The only mandatory parameter is the `ALIAS` or `PUB_KEY` from your own node. The dependency graph is how the lightning network looks from the point of view from your own node, so it would only make sense to run it with your own node alias.

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

If `export.json` is supplied, a node that is in the BOS score file will always be shown.

# dependencies

None.

# example

The only mandatory parameter is the alias or the pub_key of your node.:

```
$ node lnd_graph_crawl.js MUTATRUM
038bcc6471941c7d6c14a8ce5b7159d8f73a3a0bb9a93e8896bcb892e14552658a  distance: 0  channels:   56  capacity:   1.70  2021-03-19  MUTATRUM (bos 12765957 cap 179 cha 188 age 684 gro 44 ava 161)

02f3069a342ae2883a6f29e275f06f28a56a6ea2e2d96f5888a3266444dcf542b6  distance: 2  channels:  189  capacity:   4.23  2021-03-19  hodlister_co (bos 76595744 cap 90 cha 61 age 1625 gro 887 ava 182)
02df6d3454bc4c0cdd9b6e5f04451f53c48d22300d3066cf4a8fb49effd025c0af  distance: 2  channels:   48  capacity:   0.47  2021-03-18  Hedonismbot (bos 8510638 cap 486 cha 232 age 672 gro 9354 ava 888)
02b0172bb38617fa3afdb69664468b492d5a21062a4fa8b47284b0cc320e6e7420  distance: 2  channels:  167  capacity:   6.21  2021-03-19  Nightling 🌙 [TOR] [⚓] (bos 72340425 cap 73 cha 66 age 1838 gro 368 ava 318)
034aaa404a318beb1d4f9c3fa9603ac24702a9dc6bb31d14d7f02ab94823e28aa9  distance: 2  channels:   18  capacity:   0.31  2021-03-18  bitcoinsatayclub ⚡🇲🇾
02a5d937fd2328e1a48fd56769ab6ea810fa9c67bfac233f0ac864494b5442d483  distance: 2  channels:   12  capacity:   0.16  2021-03-18  BitLab [LND]
03205b045b0126c0d3fb826a38b9befc4babf51689544908c704d8e51fdec75ffb  distance: 2  channels:   61  capacity:   1.46  2021-03-19  BergenLNDcraeful (bos 17021276 cap 203 cha 171 age 1725 gro 361 ava 341)
037eb17d0fee2d20bacea3d78940b40f4ac61a5a7040a23b6e8280c80d7ebfb420  distance: 2  channels:  114  capacity:   2.67  2021-03-19  ln1.lightninglayer.com
03a5886df676f3b3216a4520156157b8d653e262b520281d8d325c24fd8b456b9c  distance: 2  channels:  108  capacity:   2.70  2021-03-19  Pinky (bos 8510638 cap 122 cha 94 age 2354 gro 162 ava 369)
03f7e29340c307ee37db5734834d34e3f286e2f70c6bb92b0b12e599860cea6691  distance: 2  channels:   30  capacity:   0.16  2021-03-14  Jedd
031567fdf33cb9b4ab081019199295ffce38218751842a403e9fcf48778e4c3022  distance: 2  channels:   41  capacity:   1.23  2021-03-19  LightningPartners (bos 12765957 cap 232 cha 270 age 2640 gro 3380 ava 779)
027cf99e95e346897a6f88212d5240fa790e3b4c97581bcffa354de10128998ce7  distance: 2  channels:   27  capacity:   0.86  2021-03-19  ln.vanovcan.net (bos 12765957 cap 307 cha 418 age 974 gro 1840 ava 859)
02de60d194e1ca5947b59fe8e2efd6aadeabfb67f2e89e13ae1a799c1e08e4a43b  distance: 2  channels:   28  capacity:   0.40  2021-03-18  02de60d194e1ca5947b5
03cfb64a81ad9b94e6f3fa2e34218c9242606890bbfb65a0bb57d603158e6c590c  distance: 2  channels:   29  capacity:   0.45  2021-03-18  Bitcoin Rising
02b4df3d938e9d009911610f820f4788c3483f647fc9918b944d4e566f463bb470  distance: 2  channels:   10  capacity:   0.15  2021-03-15  Super Nodo Popcorn

....

029b998768009096d025d4e10d9677242d3d4ac215e4c3bbac5b949e1a9a3ca657  distance: 3  channels:    8  capacity:   0.11  2021-03-19  LNDsneakyd
025fe4c4003dbef0bdf4301f37b0166f583aa06510f0084b286a31b627840ad065  distance: 3  channels:   14  capacity:   0.19  2021-03-18  OneWorld2199
02e6b17c5a7a2461df38d0a571d92660f38ed5bbc847166ee655a1d0f83c1aa5ac  distance: 3  channels:    7  capacity:   0.21  2021-03-18  It's showtime, Synergy!
039ac7c1536c2441cf42c9964d2614984cbc99f7ffb474e9affb451af8210a9c6f  distance: 3  channels:    7  capacity:   0.75  2021-03-18  DanishLightning.dk
0271024435660f7056c565fa9000a734cc48aa85b581a06fe9bc0b1c89e7b66874  distance: 3  channels:    7  capacity:   0.18  2021-03-18  www.constructionrates.co.uk
038317eb0af98795c87bf5156d58a97cfd7628c55cde5120122d0246d3157d11ae  distance: 3  channels:    6  capacity:   0.29  2021-03-18  c3po
0379972fb4965f1c511269f30ffd1fc91731e1c3e8977ee5bba44b1ee9338fc69e  distance: 3  channels:    6  capacity:   0.17  2021-03-18  mynodebtc.com [myNode]
0357ea880fa153a5359487915b69da4419fd81d3f33469bbdd029544f576f10bd6  distance: 3  channels:   13  capacity:   0.22  2021-03-19  SqurliNodl
030365ca0e656453e44b7da30d2643f1f6183cfe2a3bdb59b69aa8bde1136ca758  distance: 3  channels:   26  capacity:   0.53  2021-03-18  raspir3kt (bos 17021276 cap 442 cha 448 age 5095 gro 5621 ava 1072)
024e0d88d5cf3ac6df50697ac95be7fde0ac3017bc0a918edbfdb70ba70b00c17f  distance: 3  channels:   14  capacity:   0.30  2021-03-19  SoulexBoy_BXXI
025644411ff4deb7185885ef5805a50b416167be8a6a7a6b25abe587c674ab3687  distance: 3  channels:   13  capacity:   0.16  2021-03-18  FUCK FIAT
030ca78c529408bd58344a22fb0e8b60890892abda16016bb1fe9878375a6a8a69  distance: 3  channels:   80  capacity:   0.10  2021-03-19  nodl-s100
02491fdffd8ea6b8fe1faf28d73d69ea583a1ed8645f51c990f76fa36d8c6bdffc  distance: 3  channels:   77  capacity:   0.10  2021-03-19  nodl-s200
025a469a6cca6e2d40fdfdbededd305c3bbe8c4e41260ee63f03e143e389e39282  distance: 3  channels:    6  capacity:   0.14  2021-03-18  THNDR GAMES
03da5e26d76534bc012ec44326edcfaaeb61df147fd8708936df647ad1727e9826  distance: 3  channels:    6  capacity:   0.11  2021-03-19  03da5e26d76534bc012e
```

The output shows, in order:
 - pub_key
 - distance: the number of hops to reach this node
 - channels: the number of channels this node has
 - capacity: the capacity in BTC this node has
 - date: last seen activity
 - alias

if the node is on the BOS list, it shows the BOS statistics:

 - score
 - capacity rank
 - channel rank
 - age rank
 - growth rank
 - availability rank

Parameters are given in order. An examply using all parameters:

```
$ node lnd_graph_crawl.js MUTATRUM 10 5 14 describegraph.json export.json
```

This show nodes with a minimum of 20 channels, 5 BTC capacity and last seen no longer than 14 days ago. The filenames at the end are to override the default file names.
