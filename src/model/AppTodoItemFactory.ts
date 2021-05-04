import { AppTodoItem } from './interface';

export class AppTodoItemFactory {
    private static instace: AppTodoItemFactory | null = null;

    static getInstance(): AppTodoItemFactory {
        if (!this.instace) {
            this.instace = new this();
        }
        return this.instace;
    }

    private count = 0;

    constructor() {
        this.count = 0;
    }

    private getID(): number {
        this.count += 1;
        return this.count;
    }

    makeTodoItem(name: string, done: boolean, source: string,
                 primary: boolean, comments?: string): AppTodoItem {
        return {
            name, done, comments, source, id: this.getID(),
            time: new Date().toLocaleDateString().split(' ')[0],
            inPrimaryList: primary,
        };
    }
}