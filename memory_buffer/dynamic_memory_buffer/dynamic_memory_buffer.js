const { MemoryAllocator } = require('./MemoryAllocator');

async function run () {
    const memory = new WebAssembly.Memory({
        initial: 1
    });

    const allocator = new MemoryAllocator(memory.buffer);

    const aArray = allocator.allocUint32Array(3);
    aArray.set([1, 2, 3]);

    const bArray = allocator.allocUint8Array(6);
    new TextEncoder().encodeInto('ABCDEF', bArray);

    const cArray = allocator.allocUint32Array(2);
    cArray.set([4, 5]);

    console.log(aArray);
    console.log(bArray, new TextDecoder().decode(bArray));
    console.log(cArray);
}

run();