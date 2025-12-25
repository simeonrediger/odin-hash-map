import Node from './node.js';

export default class Bucket {
    #size = 0;
    #head;
    #tail;

    get size() {
        return this.#size;
    }

    nodes() {
        const nodes = [];
        let node = this.#head;

        while (node) {
            nodes.push(node);
            node = node.next;
        }

        return nodes;
    }

    append(key, value) {
        if (this.#head) {
            this.#tail.next = new Node(key, value);
            this.#tail = this.#tail.next;
        } else {
            this.#head = new Node(key, value);
            this.#tail = this.#head;
        }

        this.#size++;
    }

    at(index) {
        if (index < 0 || index >= this.#size) {
            return;
        } else if (index === this.#size - 1) {
            return this.#tail;
        }

        let node = this.#head;

        for (let i = 0; i < index && node; i++) {
            node = node.next;
        }

        return node ?? undefined;
    }

    shift() {
        if (!this.#head) {
            return;
        }

        const head = this.#head;
        this.#head = head.next;
        this.#size--;

        if (this.#size === 0) {
            this.#tail = this.#head;
        }

        return head;
    }

    pop() {
        let tail;

        if (this.#size === 0) {
            return;
        } else if (this.#size === 1) {
            tail = this.#tail;
            this.#head = undefined;
            this.#tail = undefined;
        } else {
            tail = this.#tail;
            this.#tail = this.at(this.#size - 2);
            this.#tail.next = null;
        }

        this.#size--;
        return tail;
    }

    contains(key) {
        let node = this.#head;

        while (node) {
            if (node.key === key) {
                return true;
            }

            node = node.next;
        }

        return false;
    }

    find(key) {
        let node = this.#head;

        while (node) {
            if (node.key === key) {
                return node;
            }

            node = node.next;
        }

        return null;
    }

    remove(key) {
        const node = this.find(key);

        if (!node) {
            return;
        }

        if (node === this.#head) {
            return this.shift();
        }

        if (node === this.#tail) {
            return this.pop();
        }

        const currentNode = this.#head;

        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }
    }
}
