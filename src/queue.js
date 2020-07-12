// Queue class
module.exports = class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }

  // enqueue(item)
  enqueue(element) {
    // adding element to the queue
    this.items.push(element);
  }

  // dequeue()
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  // isEmpty()
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
};
