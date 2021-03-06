const fs = require('fs');
const bytecode = fs.readFileSync(`${__dirname}/add.wasm`);

run();

async function run () {
    try {
        const wasm = await WebAssembly.instantiate(bytecode);
        console.log(wasm.instance.exports.addInt32(1,2));
        // console.log(wasm.instance.exports.addInt64(1,2));
        console.log(wasm.instance.exports.addFloat32(1.1,2.1));
        console.log(wasm.instance.exports.addFloat64(1.1,2.1));
    } catch(e) {
        console.error(e);
    }
}

