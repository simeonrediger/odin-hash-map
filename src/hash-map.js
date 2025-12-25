import Bucket from './bucket/bucket.js';

export default class HashMap {
    static initialCapacity = 16;
    static #loadFactor = 0.75;
    #capacity = HashMap.initialCapacity;
    #buckets;
    #nodeCount = 0;

    constructor() {
        this.#createBuckets();
    }

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

    #createBuckets() {
        this.#capacity = HashMap.initialCapacity;
        this.#buckets = Array(this.#capacity).fill(null);
    }

    #grow() {
        // TODO
    }

    #getBucket(key) {
        return this.#buckets[this.#hash(key) % this.#capacity];
    }

    set(key, value) {
        if (++this.#nodeCount > this.#capacity) {
            this.#grow();
        }

        let bucket = this.#getBucket(key);

        if (bucket === null) {
            bucket = new Bucket();
        }

        const matchingNode = bucket.find(key);

        if (matchingNode) {
            matchingNode.value = value;
        } else {
            bucket.append(key, value);
            this.#nodeCount++;
        }
    }

    get(key) {
        const bucket = this.#getBucket(key);
        return bucket?.find(key)?.value ?? null;
    }

    has(key) {
        const bucket = this.#getBucket(key);
        return bucket.contains(key);
    }

    remove(key) {
        const bucket = this.#getBucket(key);
        const removedNode = bucket.remove(key);

        if (bucket.size === 0) {
            bucket = null;
        }

        if (removedNode) {
            this.#nodeCount--;
        }

        return Boolean(removedNode);
    }

    get size() {
        return this.#nodeCount;
    }

    clear() {
        this.#createBuckets();
    }

    keys() {
        const keys = [];

        for (const bucket of this.#buckets) {
            for (const node of bucket.nodes()) {
                keys.push(node.key);
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for (const bucket of this.#buckets) {
            for (const node of bucket.nodes()) {
                values.push(node.value);
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for (const bucket of this.#buckets) {
            for (const node of bucket.nodes()) {
                entries.push([node.key, node.value]);
            }
        }

        return entries;
    }
}
