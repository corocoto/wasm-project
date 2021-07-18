const fs = require('fs');
const bytecode = fs.readFileSync(`${__dirname}/../../callbacks/echo/echo.wasm`);

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
        //get info about imported and exported functions in wasm file
        console.log(WebAssembly.Module.imports(wasm.module)); //[ { module: 'env', name: 'printNumber', kind: 'function' } ]
        console.log(WebAssembly.Module.exports(wasm.module)); // [ { name: 'echo', kind: 'function' } ]
    } catch (e) {
        console.error(e);
    }
}