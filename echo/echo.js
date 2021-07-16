const fs = require('fs');

async function run () {
    try {
        const bytecode = fs.readFileSync(`${__dirname}/echo.wasm`);
        const imports = {
            env: {
                // creates external function for wasm file
                printNumber: (arg) => {
                    console.log(arg);
                }
            }
        };

        const wasm = await WebAssembly.instantiate(bytecode, imports);
        wasm.instance.exports.echo(2021);

        //get info about imported and exported functions in wasm file
        console.log(WebAssembly.Module.imports(wasm.module)); //[ { module: 'env', name: 'printNumber', kind: 'function' } ]
        console.log(WebAssembly.Module.exports(wasm.module)); // [ { name: 'echo', kind: 'function' } ]
    } catch (e) {
        console.error(e);
    }
}

run();