import { TodoItem } from '../interface'

export class ItemServer {
    private todoItems: TodoItem[]
    private _listName: string

    constructor() {
        this.todoItems = []
        this._listName = ''
    }

    set listName(name: string) {
        this._listName = name
        this.load()
    }

    toggleItem(name: string) {
        const items = this.todoItems
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === name) {
                items[i].done = !items[i].done
                break
            }
        }
        this.save()
    }

    addNewItem(name: string) {
        for (let i = 0; i < this.todoItems.length; i++) {
            if (this.todoItems[i].name === name) {
                return
            }
        }
        const item: TodoItem = {
            name: name,
            done: false,
            time: new Date().toLocaleDateString()
        }
        this.todoItems.push(item)
        this.save()
    }

    itemWithName(name: string): TodoItem | undefined {
        let target: TodoItem | undefined = undefined
        this.todoItems.forEach(item => {
            if (item.name === name) {
                target = item
            }
        })
        return target
    }

    private load() {
        let result: TodoItem[] = []
        let items = localStorage.getItem(this._listName)
        if (!items) {
            this.todoItems = result
            this.save()
            return
        }
        result = JSON.parse(items).todos
        this.todoItems = result
    }

    private save() {
        localStorage.setItem(this._listName, JSON.stringify({ todos: this.todoItems }))
    }

    get items(): TodoItem[] {
        return JSON.parse(JSON.stringify(this.todoItems))
    }
}