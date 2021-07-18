const fs = require('fs');
const bytecode = fs.readFileSync(`${__dirname}/offset.wasm`);

run();

async function run() {
    try {
        const wasm = await WebAssembly.instantiate(bytecode);
        const memory = await wasm.instance.exports.memory;

        const aArray = new Uint32Array(memory.buffer, 0, 3);
        const bArray = new Uint8Array(memory.buffer, 12, 6);
        const cArray = new Uint32Array(memory.buffer, 20, 2);

        console.log(aArray);
        console.log(new TextDecoder().decode(bArray));
        console.log(cArray);
    } catch (e) {
        console.error(e);
    }
}