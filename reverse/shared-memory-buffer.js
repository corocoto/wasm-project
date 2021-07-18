const fs = require('fs');

const greeting = 'Hello world!';

const memory = new WebAssembly.Memory({
    initial: 1
});
const buffer = new Uint8Array(memory.buffer, 0, greeting.length);
const encoder = new TextEncoder();
encoder.encodeInto(greeting, buffer);

run();

async function run() {
    try {
        const bytecode = fs.readFileSync(`${__dirname}/reverse.wasm`);
        const imports = {
            env: {
                mem: memory
            }
        };

        const wasm1 = await WebAssembly.instantiate(bytecode, imports);
        const wasm2 = new WebAssembly.Instance(wasm1.module, imports);

        const decoder = new TextDecoder();
        wasm1.instance.exports.reverse(greeting.length);
        let reverseString = decoder.decode(buffer);
        console.log(`1: ${reverseString}`);

        wasm2.exports.reverse(greeting.length);
        reverseString = decoder.decode(buffer);
        console.log(`2: ${reverseString}`);
    } catch (e) {
        console.error(e);
    }
}
