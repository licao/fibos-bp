var fibos = require('fibos');
var fs = require("fs");

var producername = '';
var p2p_peer_address = '';

console.notice("start FIBOS producer nodes");

var keys = '';
// 公共钥,私钥
while (true) {
	keys = console.readLine("input the  produce-rname:public-key:private-key! oooo:xxxxx:xxxx\n");
	if (keys) break;
}
keys = keys.split(":");
producername = keys[0];

fibos.config_dir = "./blockData";
fibos.data_dir = "./blockData";

console.notice("config_dir:", fibos.config_dir);
console.notice("data_dir:", fibos.data_dir);

//建议bp不开打http
// fibos.load("http", {
// 	"http-server-address": "0.0.0.0:8870",
// 	"access-control-allow-origin": "*",
// 	"http-validate-host": false,
// 	"verbose-http-errors": true //打开报错
// });

fibos.load("net", {
	"p2p-peer-address": [
		"se-p2p.fibos.io:9870",
		"sl-p2p.fibos.io:9870",
		"to-p2p.fibos.io:9870",
		"ca-p2p.fibos.io:9870",
		"ln-p2p.fibos.io:9870",
		"va-p2p.fibos.io:9870",
		"seed.fibos.rocks:10100"
	],
	"p2p-listen-endpoint": "0.0.0.0:9870"
});

fibos.load("producer", {
	'producer-name': producername,
	'enable-stale-production': true,
	'max-transaction-time': 3000,
	'private-key': JSON.stringify([keys[1], keys[2]])
});

fibos.load("chain", {
	// "contracts-console": true,
	// 'chain-state-db-size-mb': 8 * 1024,
	// "delete-all-blocks": true,
	'genesis-json': 'genesis.json'
});

fibos.start();