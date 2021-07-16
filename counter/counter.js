const fs = require('fs');

async function run() {
    try {
        // create a mutable global variable as an integer encoded on 32 bits, with the initial value of 0
        const counter = new WebAssembly.Global({
            value: 'i32',
            mutable: true
        }, 0);

        const bytecode = fs.readFileSync(`${__dirname}/counter.wasm`);
        const imports = {
            env: {
                counter
            }
        };
        const wasm = await WebAssembly.instantiate(bytecode, imports);
        wasm.instance.exports.inc();
        wasm.instance.exports.inc();
        console.log(`Counter value is: ${counter.value}`);
    } catch (e) {
        console.error(e);
    }
}

run();