import Node from './node.js';

export default class Bucket {
    #size = 0;
    #head;
    #tail;

    get size() {
        return this.#size;
    }

    get head() {
        return this.#head;
    }

    get tail() {
        return this.#tail;
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

    prepend(key, value) {
        if (this.#head) {
            const head = this.#head;
            this.#head = new Node(key, value, head);
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

    findIndex(key) {
        let node = this.#head;

        for (let i = 0; node; i++) {
            if (node.key === key) {
                return i;
            }

            node = node.next;
        }

        return -1;
    }

    insertAt(index, ...entries) {
        if (index === 0) {
            for (let i = entries.length - 1; i >= 0; i--) {
                this.prepend(...entries[i]);
            }

            return;
        } else if (index === this.#size) {
            for (const entry of entries) {
                this.append(...entry);
            }

            return;
        } else if (index < 0 || index > this.#size) {
            throw new RangeError(
                `Insertion index must be within [0, ${this.#size}]`,
            );
        }

        let prevNode = this.at(index - 1);

        for (const entry of entries) {
            const nextNode = prevNode.next;
            prevNode.next = new Node(...entry);
            prevNode = prevNode.next;
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

        const prevNode = this.at(index - 1);
        prevNode.next = prevNode.next.next;
        this.#size--;
    }

    toString() {
        let node = this.#head;
        let string = '';

        while (node) {
            string += `( ${node.key}: ${node.value} ) -> `;
            node = node.next;
        }

        if (node === null) {
            string += node;
        }

        return string;
    }
}
