const fibos = require('fibos');
const fs = require("fs");
const process = require('process');
const config = require('./config.json');

console.notice("start FIBOS producer nodes");
let keys = "";
//update p2p
while (true) {
	keys = console.readLine("get and update p2p addreess y or n\n");
	if (keys) {
		keys = keys.toLowerCase();
		if (keys == 'y') {
			process.run('fibos', ['updatep2p.js']);
			break;
		}

		if (keys == 'n') break;

	}
}
keys = "";

while (true) {
	keys = console.readLine("input the  produce-rname:public-key:private-key! oooo:xxxxx:xxxx\n");
	if (keys) break;
}

const p2paddress = require('./p2p.json');


let public_key = "";
let private_key = "";
keys = keys.split(":");
producername = keys[0];
public_key = keys[1];
private_key = keys[2];

fibos.config_dir = config.config_dir;
fibos.data_dir = config.data_dir;

let chain_config = {
	// "contracts-console": true,
	'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true
};

if (!fs.exists(fibos.data_dir) && !fs.exists(fibos.config_dir)) {
	chain_config['genesis-json'] = "genesis.json";
}


console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

fibos.load("http", {
	"http-server-address": "0.0.0.0:8870",
	"access-control-allow-origin": "*",
	"http-validate-host": false,
	"verbose-http-errors": true
});

fibos.load("net", {
	"p2p-peer-address": p2paddress,
	"p2p-listen-endpoint": "0.0.0.0:9870"
});

fibos.load("producer", {
	'producer-name': producername,
	// 'enable-stale-production': true,
	// 'max-transaction-time': 3000,
	'private-key': JSON.stringify([public_key, private_key])
});

//v1.7.1.4 for eth fox

fibos.load("ethash");

fibos.load("bp_signature", {
	"signature-producer": producername,
	"signature-private-key": private_key
});

fibos.load("chain", chain_config);
fibos.load("chain_api");

fibos.start();