import { TodoItem } from './interface'

/**
 * 用于生成todo项目的类
 */
export class TodoItemClass implements TodoItem {
    private toJSON() {
        return {
            name: this.name,
            done: this.done,
            time: this.time
        }
    }

    constructor(public name: string, public done = false, public time = '') {
    }

    /**切换项目的完成状态 */
    toggle() {
        this.done = !this.done
    }

    /**
     * 重命名项目
     * @param newName 项目的新名称
     */
    rename(newName: string) {
        this.name = newName
    }

    /**项目的复制 */
    get copy(): TodoItem {
        return this.toJSON()
    }
}