import Node from './node.js';

export default class LinkedList {
    #size = 0;
    #head;
    #tail;

    get size() {
        return this.#size;
    }

    get head() {
        return this.#head?.value;
    }

    get tail() {
        return this.#tail?.value;
    }

    append(value) {
        if (this.#head) {
            this.#tail.nextNode = new Node(value);
            this.#tail = this.#tail.nextNode;
        } else {
            this.#head = new Node(value);
            this.#tail = this.#head;
        }

        this.#size++;
    }

    prepend(value) {
        if (this.#head) {
            const head = this.#head;
            this.#head = new Node(value, head);
        } else {
            this.#head = new Node(value);
            this.#tail = this.#head;
        }

        this.#size++;
    }

    #nodeAt(index) {
        if (index < 0 || index >= this.#size) {
            return;
        } else if (index === this.#size - 1) {
            return this.#tail;
        }

        let node = this.#head;

        for (let i = 0; i < index && node; i++) {
            node = node.nextNode;
        }

        return node ?? undefined;
    }

    at(index) {
        return this.#nodeAt(index)?.value;
    }

    shift() {
        if (!this.#head) {
            return;
        }

        const head = this.#head;
        this.#head = head.nextNode;
        this.#size--;

        if (this.#size === 0) {
            this.#tail = this.#head;
        }

        return head.value;
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
            this.#tail = this.#nodeAt(this.#size - 2);
            this.#tail.nextNode = null;
        }

        this.#size--;
        return tail.value;
    }

    contains(value) {
        let node = this.#head;

        while (node) {
            if (node.value === value) {
                return true;
            }

            node = node.nextNode;
        }

        return false;
    }

    findIndex(value) {
        let node = this.#head;

        for (let i = 0; node; i++) {
            if (node.value === value) {
                return i;
            }

            node = node.nextNode;
        }

        return -1;
    }

    insertAt(index, ...values) {
        if (index === 0) {
            for (let i = values.length - 1; i >= 0; i--) {
                this.prepend(values[i]);
            }

            return;
        } else if (index === this.#size) {
            for (const value of values) {
                this.append(value);
            }

            return;
        } else if (index < 0 || index > this.#size) {
            throw new RangeError(
                `Insertion index must be within [0, ${this.#size}]`,
            );
        }

        let prevNode = this.#nodeAt(index - 1);

        for (const value of values) {
            const nextNode = prevNode.nextNode;
            prevNode.nextNode = new Node(value, nextNode);
            prevNode = prevNode.nextNode;
            this.#size++;
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.shift();
            return;
        } else if (index === this.#size - 1) {
            this.pop();
            return;
        } else if (index < 0 || index >= this.#size) {
            throw new RangeError(
                `Removal index must be within [0, ${this.#size})`,
            );
        }

        const prevNode = this.#nodeAt(index - 1);
        prevNode.nextNode = prevNode.nextNode.nextNode;
        this.#size--;
    }

    toString() {
        let node = this.#head;
        let string = '';

        while (node) {
            string += `( ${node.value} ) -> `;
            node = node.nextNode;
        }

        if (node === null) {
            string += node;
        }

        return string;
    }
}
