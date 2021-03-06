const fs = require('fs');
const CONFIG = require('./config.json');
const FIBOS = require('fibos.js');

let fibos = FIBOS({
	chainId: CONFIG["chainId"],
	httpEndpoint: "http://to-rpc.fibos.io:8870",
	logger: {
		log: null,
		error: null
	}
});

let producers = fibos.getTableRowsSync({
	json: true,
	code: "producerjson",
	scope: "producerjson",
	table: "producerjson",
	limit: 500
});
let p2pddress = [];

producers.rows.forEach((d) => {
	const owner = d.owner;
	let producer = JSON.parse(d.json);

	if (producer.nodes) producer.nodes.forEach(r => {
		if (r.p2p_endpoint && p2pddress.indexOf(r.p2p_endpoint) == -1) {
			p2pddress.push(r.p2p_endpoint.replace('http://', ''));
		}
	});
})

fs.writeFile("p2p.json", JSON.stringify(p2pddress));