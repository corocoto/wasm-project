const fs = require('fs');
const bytecode = fs.readFileSync(`${__dirname}/game.wasm`);

run();

async function run() {
    try {
        const wasm = await WebAssembly.instantiate(bytecode);

        const { exports } = wasm.instance;
        const { table } = exports;

        table.set(0, exports.moveToEast); //Ship  #0 will move to the East
        table.set(1, exports.moveToWest); // Ship  #1 will move to the West
        table.set(2, exports.moveToNorth); // Ship  #2 will move to the North
        table.set(3, exports.moveToSouth); // Ship  #3 will move to the South

        // Move the ships for 2 cycles
        const { gameLoop } = exports;
        gameLoop();
        gameLoop();

        const positions = new Int32Array(exports.memory.buffer);
        console.log(`Ship #0 locate at ${positions[0]},${positions[1]}`);
        console.log(`Ship #1 locate at ${positions[2]},${positions[3]}`);
        console.log(`Ship #2 locate at ${positions[4]},${positions[5]}`);
        console.log(`Ship #3 locate at ${positions[6]},${positions[7]}`);
    } catch (e) {
        console.error(e);
    }
}