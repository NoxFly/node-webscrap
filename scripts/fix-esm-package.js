const fs = require("fs");
const path = require("path");

const buildDir = "./dist";

const jsonPath = path.join(buildDir, 'esm', 'package.json');

if(!fs.existsSync(jsonPath)) {
	const data = new Uint8Array(Buffer.from('{"type": "module"}'));

	fs.writeFile(jsonPath, data, err => {
		if(err) {
			throw err;
		}
	});
}