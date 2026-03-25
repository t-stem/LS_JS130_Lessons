let Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError('This is not a todo. Can only add todo items.');
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(index) {
    let lastIndex = this.size() - 1;
    if (typeof index !== 'number' || index > lastIndex || index < 0 ) {
      throw new ReferenceError(`Invalid index (${index})`);
    }
  }
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    let item = this.itemAt(index);
    item.markDone()
  }

  markUndoneAt(index) {
    let item = this.itemAt(index);
    item.markUndone()
  }

  isDone() {
    return this.todos.every(item => item.isDone() === true);
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let todos = this.todos.map(todo => todo.toString()).join('\n');
    return `${title}\n${todos}`;
  }

  forEach(callback) {
    for (let index = 0; index < this.todos.length; index += 1) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let filteredList = new TodoList('Filtered');
    this.forEach(todo => {
      if (callback(todo) === true) {
        filteredList.add(todo);
      }
    });
    return filteredList;
  }

  findByTitle(title) {
    let matches = this.filter(todo => {
      return todo.getTitle() === title;
    });
    if (matches.size() > 0) return matches.first();
    return undefined;
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let todo = this.findByTitle(title)
    if (todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;