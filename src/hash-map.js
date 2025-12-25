export default class HashMap {
    static #loadFactor = 0.75;
    #capacity = 16;
    #buckets = Array(this.#capacity).fill(null);

    #hash(key) {
        if (typeof key !== 'string') {
            throw new TypeError(
                `HashMap keys must be strings. Got ${typeof key}.`,
            );
        }

        let hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.#capacity;
        }

        return hash;
    }
}
