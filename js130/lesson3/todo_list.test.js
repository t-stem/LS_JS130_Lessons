const Todo = require('./todo.js');
const TodoList = require('./todo_list.js');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here

  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("toArray returns copy of todos", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("first returns first todo", () => {
    expect(list.first()).toBe(list.todos[0]);
  });

  test("last returns last todo", () => {
    expect(list.last()).toBe(list.todos[list.size() - 1]);
  });

  test("shift removes and returns first todo", () => {
    let shifted = list.shift();
    expect(shifted).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test("pop removes and returns last todo", () => {
    let popped = list.pop();
    expect(popped).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone returns true when all todos are done", () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    expect(list.isDone()).toBe(true);
  });

  test("add throws error when non-todo item is added", () => {
    let wrongObj = {};
    let rightObj = new Todo('Test');
    list.add(rightObj);
    expect(() => list.add(wrongObj)).toThrow(TypeError);
    expect(list.last()).toBe(rightObj);
  });

  test("itemAt throws reference error when accessing index with no element", () => {
    expect(() => list.itemAt(list.size() + 1)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(2)).toBe(todo3);
  });

  test("markDoneAt throws reference error when accessing index with no element", () => {
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    expect(() => list.markDoneAt(list.size() + 1)).toThrow(ReferenceError);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(true);
    expect(list.itemAt(2).isDone()).toBe(true);
  });

  test("markUndoneAt throws reference error when accessing index with no element", () => {
    list.markDoneAt(0);
    list.markDoneAt(1);
    list.markDoneAt(2);
    list.markUndoneAt(0);
    list.markUndoneAt(1);
    list.markUndoneAt(2);
    expect(() => list.markUndoneAt(list.size() + 1)).toThrow(ReferenceError);
    expect(list.itemAt(0).isDone()).toBe(false);
    expect(list.itemAt(1).isDone()).toBe(false);
    expect(list.itemAt(2).isDone()).toBe(false);
  });

  test("markAllDone marks all items as done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test("removeAt removes item at index and throws error if index is out of bounds", () => {
    expect(() => list.removeAt(list.size() + 1)).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list.todos).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
    expect(list.toString()).toBe(string);
    });

  test('toString returns correct string when a todo is done', () => {
    list.markDoneAt(2);
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[X] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test("toString returns correct string when all todos are done", () => {
    list.markAllDone();
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });  

  test("forEach executes callback for each element", () => {
    let testArr = [];
    let callback = (element) => testArr.push(element);
    list.forEach(callback);

    expect(testArr).toEqual(list.todos);
  });

  test("filter correctly filters for callback", () => {
    list.markDoneAt(0);
    list.markDoneAt(2);

    let targetList = new TodoList("Filtered");
    targetList.add(todo1);
    targetList.add(todo3);

    let callback = (element) => element.isDone();
    expect(list.filter(callback)).toEqual(targetList);
  });
});