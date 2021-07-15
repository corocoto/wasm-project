const fs = require('fs');
const bytecode = fs.readFileSync('add.wasm');
let wasm = (async()=>await WebAssembly.instantiate(bytecode))();