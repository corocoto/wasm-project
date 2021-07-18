const fs = require('fs');


async function run() {
    const memory = new WebAssembly.Memory({
        initial: 1,
        maximum: 2
    });

    const numbers = new Uint32Array(memory.buffer);

    for (let i = 0; i < 10; i++) {
        numbers[i]= i;
    }

    try {
        const bytecode = fs.readFileSync(`${__dirname}/sum.wasm`);
        const imports = {
            env: {
                mem: memory
            }
        };
        const wasm = await WebAssembly.instantiate(bytecode, imports);
        const sum = wasm.instance.exports.sum(10);
        console.log(sum);
    } catch (e) {
        console.error(e);
    }
}

run();