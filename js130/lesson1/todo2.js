class Todo {
  static DONE_MARKER = 'X';
  static UNDONE_MARKER = ' ';

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new Error('TypeError: this is not a todo. Can only add todo items.');
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

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

// list.forEach(todo => console.log(todo.toString()));

todo1.markDone();
todo5.markDone();
let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);
// console.log(list.filter(todo => todo.isDone()).first());

// console.log(list.findByTitle("Go shopping"));
// console.log(list.allNotDone());

// list.markDone("Go shopping");
// console.log(list)

// list.markAllUndone();
//console.log(list)

console.log(list.toArray());