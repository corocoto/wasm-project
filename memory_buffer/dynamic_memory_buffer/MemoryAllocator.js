class MemoryAllocator {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }

    allocUint32Array(length) {
        const int32Offset = Math.ceil(this.offset / Uint32Array.BYTES_PER_ELEMENT);
        const beginOffset = int32Offset * Uint32Array.BYTES_PER_ELEMENT;
        const endOffset = (int32Offset + length) * Uint32Array.BYTES_PER_ELEMENT;

        const subArray = new Uint32Array(this.buffer, beginOffset, length);
        this.offset = endOffset;
        return subArray.fill(0);
    }

    allocUint8Array (length) {
        const subArray = new Uint8Array(this.buffer, this.offset, length);
        this.offset += length;
        return subArray.fill(0);
    }
}

module.exports = {
    MemoryAllocator
};