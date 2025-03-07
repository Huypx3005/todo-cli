import { TodoItem } from "./todoItem.js";
export class TodoCollection {
    userName;
    todoItems;
    nextId = 1;
    itemMap = new Map();
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        // this.todoItems.push(new TodoItem(this.nextId, task));
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }
    getTodoById(id) {
        // return this.todoItems.find((item) => item.id === id);
        return this.itemMap.get(id);
    }
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter((item) => includeComplete || !item.complete);
    }
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }
    removeComplete() {
        this.itemMap.forEach((item) => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        });
    }
    getItemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length,
        };
    }
}
