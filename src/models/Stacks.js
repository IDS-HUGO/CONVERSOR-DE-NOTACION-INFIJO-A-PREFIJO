import { Node } from "./Node.js";

export class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }

    push(element) {
        const newNode = new Node(element);
        if (!this.top) {
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.size++;
    }

    pop() {
        if (!this.top) return null;
        const popped = this.top;
        this.top = this.top.next;
        popped.next = null;
        this.size--;
        return popped.element;
    }

    peek() {
        if (!this.top) return null;
        return this.top.element;
    }

    isEmpty() {
        return this.size === 0;
    }

    clear() {
        this.top = null;
        this.size = 0;
    }
}
