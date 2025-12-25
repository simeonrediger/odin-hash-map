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

    #resetBuckets(resetCapacity = true) {
        if (resetCapacity) {
            this.#capacity = HashMap.initialCapacity;
        }

        this.#buckets = Array(this.#capacity);
        this.#nodeCount = 0;
    }

    #grow() {
        this.#capacity *= 2;
        this.#buckets.length = this.#capacity;
        this.#rehash();
    }

    #rehash() {
        const keys = this.keys();
        this.#resetBuckets(false);

        for (const key of keys) {
            this.set(key);
        }
    }

    #getBucket(key) {
        return this.#buckets[this.#getBucketIndex(key)];
    }

    #getBucketIndex(key) {
        return this.#hash(key) % this.#capacity;
    }

    set(key) {
        const bucketIndex = this.#getBucketIndex(key);
        let bucket = this.#buckets[bucketIndex];

        if (!bucket) {
            bucket = new Bucket();
            this.#buckets[bucketIndex] = bucket;
        }

        const matchingNode = bucket.find(key);

        if (matchingNode) {
            return;
        } else {
            if (this.#nodeCount + 1 > this.#capacity * HashMap.#loadFactor) {
                this.#grow();
                this.set(key);
            } else {
                bucket.append(key);
                this.#nodeCount++;
            }
        }
    }

    has(key) {
        const bucket = this.#getBucket(key);
        return bucket?.contains(key) ?? false;
    }

    delete(key) {
        const bucketIndex = this.#getBucketIndex(key);
        const bucket = this.#buckets[bucketIndex];
        const removedNode = bucket?.remove(key);

        if (bucket?.size === 0) {
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

    printTable() {
        for (let i = 0; i < this.#capacity; i++) {
            const bucket = this.#buckets[i];

            console.log(
                `${i}:`.padStart(Math.log(this.size) + 1),
                bucket?.nodes().map(node => node.key) ?? '',
            );
        }
    }
}
