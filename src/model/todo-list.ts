import { TodoItem, TodoList, ListInfo } from './interface'
import { TodoItemClass } from './todo-item'

/**
 * 保存todo项目的列表类
 */
export class TodoListClass implements TodoList {
    /**保存的todo项目 */
    private todoItems: TodoItemClass[]
    private color = '#87cefa'

    get colorTheme(): string {
        return this.color
    }

    set colorTheme(color: string) {
        this.color = color
    }

    get items(): TodoItemClass[] {
        return this.todoItems
    }

    /**保存项目的数量 */
    get count(): number {
        return this.todoItems.length
    }

    /**
     * 返回列表的名称以及未完成todo的数量
     */
    get listInfo(): ListInfo {
        let count = 0
        for (let item of this.todoItems) {
            if (!item.done) {
                count++
            }
        }
        return {
            name: this.name,
            count,
            isActive: false,
            isPrimary: this.name === '我的一天',
            theme: this.colorTheme,
        }
    }

    get listTotalInfo(): ListInfo {
        return {
            name: this.name,
            count: this.count,
            isActive: false,
            theme: this.colorTheme,
            isPrimary: this.name === '我的一天',
        }
    }

    constructor(public name: string) {
        this.name = name
        this.todoItems = []
    }

    private toJSON() {
        return {
            name: this.name,
            items: this.todoItems,
            count: this.count,
            theme: this.colorTheme,
        }
    }

    /**
     * 列表中是否包含指定项目
     * @param itemName todo名称
     */
    containsItem(itemName: string): boolean {
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.todoItems[i].name === itemName) {
                return true
            }
        }
        return false
    }

    /**
     * 添加新todo项目
     * @param item 要添加的todo项目（有两种表示方式，一个是todo的名称，另一个是todo本身）
     */
    addNewItem(item: TodoItem | string) {
        if (typeof item === 'string') {
            const inOrNot = this.containsItem(item)
            if (inOrNot) {
                return
            }
            const newItem = new TodoItemClass(item)
            this.todoItems.push(newItem)
        } else {
            const inOrNot = this.containsItem(item.name)
            if (inOrNot) {
                return
            }
            // console.log(`item: ${item}`)
            this.todoItems.push(
                new TodoItemClass(
                    item.name,
                    item.done,
                    item.time,
                    item.inPrimaryList,
                    item.comments,
                    item.source,
                ),
            )
        }
    }

    /**
     * 删除指定项目
     * @param itemName 要删除的todo名称
     */
    removeItem(itemName: string) {
        const inOrNot = this.containsItem(itemName)
        if (!inOrNot) {
            return
        }
        const index = this.itemIndex(itemName)
        this.todoItems.splice(index, 1)
    }

    /**
     * 重命名项目
     * @param oldName 旧项目名称
     * @param newName 新项目名称
     */
    renameItem(oldName: string, newName: string) {
        if (oldName === newName) {
            return
        }
        const inOrNot = this.containsItem(oldName)
        if (!inOrNot) {
            return
        }
        const index = this.itemIndex(oldName)
        this.todoItems[index].name = newName
    }

    /**
     * 返回列表中保存的项目的内容，若没有该项目返回`undefined`。
     * @param itemName 项目名称
     */
    itemInfo(itemName: string): TodoItem | undefined {
        const inOrNot = this.containsItem(itemName)
        if (!inOrNot) {
            return undefined
        }
        const index = this.itemIndex(itemName)
        const item = this.todoItems[index]
        return {
            name: item.name,
            done: item.done,
            time: item.time,
            inPrimaryList: item.inPrimaryList,
            comments: item.comments,
            source: item.source,
        }
    }

    /**
     * 重命名列表
     * @param newName 新的列表名称
     */
    rename(newName: string) {
        if (newName === this.name) {
            return
        }
        this.name = newName
        this.todoItems.forEach(item => {
            item.source = newName
        })
    }

    /**
     * 指定项目在列表中的索引值，用于列表增/删之类的操作
     * @param name 项目名称
     */
    private itemIndex(name: string): number {
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.items[i].name === name) {
                return i
            }
        }
        return -1
    }
}
