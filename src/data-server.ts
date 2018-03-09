import { TodoItem, TodoList, ListInfo } from './interface'


/**数据保存的格式 */
interface Data {
    lists: TodoList[]
    lastModified: string
}

export class DataServer {
    private data: Data
    private _listName: string

    constructor() {
        this.data = {} as Data
        this._listName = ''
        this.load()
    }

    /**
     * 返回列表名称的数组集合
     */
    get lists(): string[] {
        let result: string[] = []
        for (let list of this.data.lists) {
            result.push(list.name)
        }
        return result
    }

    itemsOfList(listName: string): TodoItem[] {
        for (let i = 0; i < this.data.lists.length; i++) {
            if (this.data.lists[i].name === listName) {
                return JSON.parse(JSON.stringify(this.data.lists[i].items))
            }
        }
        return []
    }

    // numberOfItemsInList(listName: string): number {
    //     const listIndex = this.listNameIndex(listName)
    //     if (listIndex < 0) { return 0 }
    //     return this.data.lists[listIndex].count
    // }

    get listInfos(): ListInfo[] {
        let infos: ListInfo[] = []
        const lists = this.data.lists

        for (let i = 0; i < lists.length; i++) {
            infos.push({
                name: lists[i].name,
                count: lists[i].count
            })
        }
        return infos
    }

    itemInList(itemName: string, listName: string): TodoItem | undefined {
        const listIndex = this.listNameIndex(listName)
        if (listIndex < 0) { return }
        const items = this.data.lists[listIndex].items
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === itemName) {
                return JSON.parse(JSON.stringify(items[i])) as TodoItem
            }
        }
        return
    }

    get lastModified(): string {
        const name = this.data.lastModified
        return name === '' ? '我的一天' : name
    }

    set lastModified(name: string) {
        this.data.lastModified = name
        this.save()
    }

    addNewList(name: string) {
        for (let i = 0; i < this.data.lists.length; i++) {
            if (this.data.lists[i].name === name) {
                return
            }
        }
        const list: TodoList = {
            name,
            items: [],
            count: 0
        }
        this.data.lists.push(list)
        this.data.lastModified = name
        this.save()
    }

    renameList(oldName: string, newName: string) {
        if (oldName === newName) { return }
        const index = this.listNameIndex(oldName)
        if (index === -1) { return }
        this.data.lists[index].name = newName
        this.data.lastModified = newName
        this.save()
    }

    deleteList(name: string) {
        if (this.data.lists.length < 2) { return }
        const index = this.listNameIndex(name)
        if (index === -1) { return }
        this.data.lists.splice(index, 1)
        this.data.lastModified = this.data.lists[0].name
        this.save()
    }

    deleteItemInList(itemName: string, listName: string) {
        const listIndex = this.listNameIndex(listName)
        if (listIndex < 0) { return }
        const list = this.data.lists[listIndex]

        let itemIndex = -1
        for (let i = 0; i < list.items.length; i++) {
            if (list.items[i].name === itemName) {
                itemIndex = i
            }
        }

        list.items.splice(itemIndex, 1)
        list.count = list.items.length
        this.save()
    }

    addNewItemInList(itemName: string, listName: string) {
        const listIndex = this.listNameIndex(listName)
        if (listIndex < 0) { return }

        const items = this.data.lists[listIndex].items
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === itemName) {
                return
            }
        }

        const newItem = this.createTodoItem(itemName)
        this.data.lists[listIndex].items.push(newItem)
        this.data.lists[listIndex].count++
        this.save()
    }

    toggleItemInList(itemName: string, listName: string) {
        const listIndex = this.listNameIndex(listName)
        if (listIndex < 0) { return }
        const items = this.data.lists[listIndex].items
        for (let item of items) {
            if (item.name === itemName) {
                item.done = !item.done
            }
        }
        this.save()
    }

    private createTodoItem(name: string): TodoItem {
        return {
            name: name,
            done: false,
            time: new Date().toLocaleDateString()
        }
    }

    private listNameIndex(name: string): number {
        let index = -1
        for (let i = 0; i < this.data.lists.length; i++) {
            if (this.data.lists[i].name === name) {
                index = i
                break
            }
        }
        return index
    }

    /**从本地加载数据，没有则初始化数据 */
    private load() {
        const result = localStorage.getItem('react-todo-app')
        if (result === null) {
            let data = {
                lists: [
                    {
                        name: '我的一天',
                        items: [
                        ],
                        count: 0
                    }
                ],
                lastModified: '我的一天'
            }
            this.data = data
            this.lastModified = data.lastModified
            this.save()
        } else {
            const data = JSON.parse(result).data as Data
            this.data = data
            this._listName = data.lastModified
        }
    }

    private save() {
        localStorage.setItem('react-todo-app', JSON.stringify({ data: this.data }))
    }
}