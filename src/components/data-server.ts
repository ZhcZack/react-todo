import { TodoItem, TodoList } from '../interface'


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

    itemsInList(listName: string): TodoItem[] {
        for (let i = 0; i < this.data.lists.length; i++) {
            if (this.data.lists[i].name === listName) {
                return JSON.parse(JSON.stringify(this.data.lists[i].items))
            }
        }
        return []
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
        if (index < 0) { return }
        this.data.lists[0].name = newName
        if (this.data.lastModified === oldName) {
            this.data.lastModified = newName
        }
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