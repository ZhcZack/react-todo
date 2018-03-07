import { TodoItem } from '../interface';

/**Todo项目服务，负责新建/切换/删除todo操作 */
export class ItemServer {
    private todoItems: TodoItem[];
    /**保存todo的列表名称 */
    private _listName: string;

    constructor() {
        this.todoItems = [];
        this._listName = '';
    }

    /**
     * 根据列表名称获取待办事项
     */
    set listName(name: string) {
        this._listName = name;
        this.load();
    }

    /**
     * 更改列表名称
     * 
     * 这里出现这个方法的原因是，更改名称之后要将之前保存的内容转移到新列表名下，并且要删除之前的内容。
     * @param oldName 旧列表名
     * @param newName 新列表名
     */
    renameList(oldName: string, newName: string) {
        if (oldName === newName) { return }
        this._listName = newName
        this.save()
        localStorage.removeItem(oldName)
    }

    /**
     * 根据名称切换对应todo的完成状态
     * @param name todo的名称
     */
    toggleItem(name: string) {
        const items = this.todoItems;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === name) {
                items[i].done = !items[i].done;
                break;
            }
        }
        this.save();
    }

    /**
     * 添加一个新的todo，状态默认为“未完成”
     * @param name todo的名称
     */
    addNewItem(name: string) {
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.todoItems[i].name === name) {
                return;
            }
        }
        const item: TodoItem = {
            name: name,
            done: false,
            time: new Date().toLocaleDateString()
        };
        this.todoItems.push(item);
        this.save();
    }

    /**
     * 删除todo
     * @param name todo的名称
     */
    deleteItem(name: string) {
        let index = -1;
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.todoItems[i].name === name) {
                index = i;
                break;
            }
        }
        if (index === -1) { return; }
        this.todoItems.splice(index, 1);
        this.save();
    }

    /**
     * 根据`name`返回对应的`TodoItem`，如果没有对应内容返回undefined。
     * @param name todo的名称
     */
    itemWithName(name: string): TodoItem | undefined {
        let target: TodoItem | undefined = undefined;
        this.todoItems.forEach(item => {
            if (item.name === name) {
                target = item;
            }
        });
        return target;
    }

    /**
     * 从本地数据里根据列表名称（`listName`）加载待办事项
     */
    private load() {
        let result: TodoItem[] = [];
        let items = localStorage.getItem(this._listName);
        if (items === null) {
            this.todoItems = result;
            this.save();
            return;
        }
        result = JSON.parse(items).todos;
        this.todoItems = result;
    }

    /** 
     * 将代办事项内容与对应的列表名称一起保存到本地数据中
     */
    private save() {
        localStorage.setItem(this._listName, JSON.stringify({ todos: this.todoItems, length: this.todoItems.length }));
    }

    /**
     * 返回代办事项的数组表达
     */
    get items(): TodoItem[] {
        return JSON.parse(JSON.stringify(this.todoItems));
    }
}