const fs = require('fs');
const config = require('./config.json');
const FIBOS = require('fibos.js');
const coroutine = require('coroutine');

let keys = "";

while (true) {
	keys = console.readLine("input the  produce-rname:public-key:private-key! oooo:xxxxx:xxxx\n");
	if (keys) break;
}

let public_key = "";
let private_key = "";
keys = keys.split(":");
producername = keys[0];
public_key = keys[1];
private_key = keys[2];



while (true) {
	//beijing time
	const date = new Date();
	const hours = date.getHours() + date.getTimezoneOffset() / 60 + 8;
	const minutes = date.getMinutes();
	console.log("claimrewards ==> ", date);
	if (hours >= config.hours && hours < config.hours + 1 && minutes > config.minutes) {
		const fibos = FIBOS({
			chainId: config["chainId"],
			keyProvider: private_key,
			httpEndpoint: config.httpEndpoint,
			logger: {
				log: null,
				error: null
			}
		});
		try {
			console.notice("claimrewards ==> ",hours + ":" + minutes);
			const a = fibos.claimrewardsSync(producername);
			if (a.broadcast) {
				coroutine.sleep(30 * 60 * 1000);
			}
		} catch (e) {
			console.log("error", e)
		}

	}

	coroutine.sleep(20 * 1000);
}