var fibos = require('fibos');
var fs = require("fs");

console.notice("start FIBOS producer nodes");

var keys = "";

while (true) {
	keys = console.readLine("input the  produce-rname:public-key:private-key! oooo:xxxxx:xxxx\n");
	if (keys) break;
}


var public_key = "";
var private_key = "";
keys = keys.split(":");
producername = keys[0];
public_key = keys[1];
private_key = keys[2];

fibos.config_dir = "./blockData";
fibos.data_dir = "./blockData";

var p2p_peer_address = [
	"se-p2p.fibos.io",
	"sl-p2p.fibos.io",
	"to-p2p.fibos.io",
	"ca-p2p.fibos.io",
	"ln-p2p.fibos.io",
	"va-p2p.fibos.io",
	"fibos.smr123.com:7890",
	"p2p-mainnet.fibos123.com:9977",
	"seed-mainnet.fibscan.io:9103",
	"seed.bitze.site:9870",
	"seed.fibos.rocks:10100",
	"p2p.xm.fo:10300",
	"api.fibosgenesis.com:9870",
	"fibos.qubitfund.com:9870",
	"p2p.foshenzhenbp.com:9877",
	"p2p.mainnet.fibos.me:80",
	"fibos-p2p.slowmist.io:9870",
	"superfibos.com:9870"
];

var chain_config = {
	"contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": "127.0.0.1:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"p2p-peer-address": p2p_peer_address,
	"p2p-listen-endpoint": "0.0.0.0:9870"
});

fibos.load("producer", {
	'producer-name': producername,
	'enable-stale-production': true,
	'max-transaction-time': 3000,
	'private-key': JSON.stringify([public_key, private_key])
});


fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.start();