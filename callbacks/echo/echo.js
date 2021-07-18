const fs = require('fs');
const bytecode = fs.readFileSync(`${__dirname}/echo.wasm`);

const imports = {
    env: {
        // creates external function for wasm file
        printNumber: (arg) => {
            console.log(arg);
        }
    }
};

run();

async function run () {
    try {
        const wasm = await WebAssembly.instantiate(bytecode, imports);
        wasm.instance.exports.echo(2021);
    } catch (e) {
        console.error(e);
    }
}