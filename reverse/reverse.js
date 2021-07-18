const fs = require('fs');

const greeting = 'Hello world!';
const memory = new WebAssembly.Memory({
    initial: 1
});
const buffer = new Uint8Array(memory.buffer, 0, greeting.length);
const encoder = new TextEncoder();
encoder.encodeInto(greeting, buffer); //make a copy

run();

async function run() {
    try {
        const bytecode = fs.readFileSync(`${__dirname}/reverse.wasm`);
        const imports = {
            env: {
                mem: memory
            }
        };
        const wasm = await WebAssembly.instantiate(bytecode, imports);
        wasm.instance.exports.reverse(greeting.length);

        const decoder = new TextDecoder();
        const reverseString = decoder.decode(buffer);  // Make a copy
        console.log(reverseString);
    } catch (e) {
        console.error(e);
    }
}

