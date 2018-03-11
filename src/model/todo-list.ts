import { TodoItem, TodoList, ListInfo } from './interface'
import { TodoItemClass } from './todo-item'

/**
 * 保存todo项目的列表类
 */
export class TodoListClass implements TodoList {
    /**保存的todo项目 */
    private todoItems: TodoItemClass[]

    get items(): TodoItemClass[] {
        return this.todoItems
    }

    /**保存项目的数量 */
    get count(): number {
        return this.todoItems.length
    }

    get listInfo(): ListInfo {
        return {
            name: this.name,
            count: this.count
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
            count: this.count
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
     * 添加新项目
     * @param itemName 名称
     * @param isDone 完成状态
     * @param createTime 创建时间
     * @param comments 备注（可选项）
     */
    addNewItem(itemName: string, isDone = false, createTime = new Date().toLocaleDateString(), comments?: string) {
        const inOrNot = this.itemInList(itemName)
        if (inOrNot) { return }
        this.todoItems.push(new TodoItemClass(itemName, isDone, createTime, comments))
    }

    /**
     * 删除指定项目
     * @param itemName 要删除的todo名称
     */
    removeItem(itemName: string) {
        const inOrNot = this.itemInList(itemName)
        if (!inOrNot) { return }
        const index = this.itemIndex(itemName)
        this.todoItems.splice(index, 1)
    }

    /**
     * 重命名项目
     * @param oldName 旧项目名称
     * @param newName 新项目名称
     */
    renameItem(oldName: string, newName: string) {
        if (oldName === newName) { return }
        const inOrNot = this.itemInList(oldName)
        if (!inOrNot) { return }
        const index = this.itemIndex(oldName)
        this.todoItems[index].rename(oldName)
    }

    /**
     * 返回列表中保存的项目的内容，若没有该项目返回`undefined`。
     * @param itemName 项目名称
     */
    itemInfo(itemName: string): TodoItem | undefined {
        const inOrNot = this.itemInList(itemName)
        if (!inOrNot) { return undefined }
        const index = this.itemIndex(itemName)
        const item = this.todoItems[index]
        return {
            name: item.name,
            done: item.done,
            time: item.time
        }
    }

    /**
     * 重命名列表
     * @param newName 新的列表名称
     */
    rename(newName: string) {
        if (newName === this.name) { return }
        this.name = newName
    }

    /**
     * 列表中是否包含指定项目
     * @param name 项目名称
     */
    private itemInList(name: string): boolean {
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.items[i].name === name) {
                return true
            }
        }
        return false
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