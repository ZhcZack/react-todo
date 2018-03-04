export class ListServer {
    private lists: string[]

    constructor() {
        this.lists = []
        this.load()
    }

    private load() {
        const result = localStorage.getItem('todo-app-list')
        if (!result) {
            // 没有本地存储，那就新建一个
            this.lists = ['我的一天']
        } else {
            this.lists = JSON.parse(result).lists
        }
        this.save()
    }

    private save() {
        localStorage.setItem('todo-app-list', JSON.stringify({ lists: this.lists }))
    }

    get names(): string[] {
        return JSON.parse(JSON.stringify(this.lists))
    }

    addNewList(name: string) {
        this.lists.push(name)
        this.save()
    }
}