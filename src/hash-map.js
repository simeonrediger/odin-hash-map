import Bucket from './bucket/bucket.js';

export default class HashMap {
    static initialCapacity = 16;
    static #loadFactor = 0.75;
    #capacity = HashMap.initialCapacity;
    #buckets;
    #nodeCount = 0;

    constructor() {
        this.#resetBuckets();
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

    #resetBuckets() {
        this.#capacity = HashMap.initialCapacity;
        this.#buckets = Array(this.#capacity);
    }

    #grow() {
        // TODO
    }

    #getBucket(key) {
        return this.#buckets[this.#getBucketIndex(key)];
    }

    #getBucketIndex(key) {
        return this.#hash(key) % this.#capacity;
    }

    set(key, value) {
        const bucketIndex = this.#getBucketIndex(key);
        let bucket = this.#buckets[bucketIndex];

        if (!bucket) {
            bucket = new Bucket();
            this.#buckets[bucketIndex] = bucket;
        }

        const matchingNode = bucket.find(key);

        if (matchingNode) {
            matchingNode.value = value;
        } else {
            if (++this.#nodeCount > this.#capacity * HashMap.#loadFactor) {
                this.#grow();
            }

            bucket.append(key, value);
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

    delete(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const bucket = this.#buckets[bucketIndex];
        const removedNode = bucket?.remove(key);

        if (bucket.size === 0) {
            this.#buckets[bucketIndex] = undefined;
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
        this.#resetBuckets();
    }

    keys() {
        const keys = [];

        for (const bucket of this.#buckets) {
            if (!bucket) {
                continue;
            }

            for (const node of bucket.nodes()) {
                keys.push(node.key);
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for (const bucket of this.#buckets) {
            if (!bucket) {
                continue;
            }

            for (const node of bucket.nodes()) {
                values.push(node.value);
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for (const bucket of this.#buckets) {
            if (!bucket) {
                continue;
            }

            for (const node of bucket.nodes()) {
                entries.push([node.key, node.value]);
            }
        }

        return entries;
    }

    printTable() {
        console.log(
            this.#buckets.map((bucket, i) => [
                i,
                bucket?.nodes().map(node => `${node.key} -> ${node.value}`) ??
                    bucket,
            ]),
        );
    }
}
