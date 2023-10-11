const fetch = require('node-fetch');
const { schedule } = require('@netlify/functions');

const handler = async function (event, context) {
	try {
		await fetch(process.env.BUILD_HOOK, { method: 'POST'});
	} catch (err) {
		console.error(err);
	}
}

module.exports.handler = schedule('@daily', handler);