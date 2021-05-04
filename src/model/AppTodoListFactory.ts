import { AppTodoItem, AppTodoList, TodoItem } from './interface';

export class AppTodoListFactory {
    static getInstance(): AppTodoListFactory {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    private static instance: AppTodoListFactory | null = null;
    private count: number;

    constructor() {
        this.count = 0;
    }

    private getID(): number {
        this.count += 1;
        return this.count;
    }

    makeTodoList(name: string, todos: AppTodoItem[], active: boolean,
                 theme: string, primary: boolean): AppTodoList {
        return {
            id: this.getID(),
            name,
            todos,
            active,
            theme,
            primary,
        };
    }

}