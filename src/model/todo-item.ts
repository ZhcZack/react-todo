import { TodoItem } from './interface'

/**
 * 用于生成todo项目的类
 */
export class TodoItemClass implements TodoItem {
    private toJSON() {
        return {
            name: this.name,
            done: this.done,
            time: this.time,
            inPrimaryList: this.inPrimaryList,
            comments: this.comments,
            source: this.source,
        }
    }

    constructor(
        public name: string,
        public done = false,
        public time = new Date().toLocaleDateString(),
        public inPrimaryList = false,
        public comments?: string,
        public source?: string,
    ) {}

    /**切换项目的完成状态 */
    toggle() {
        this.done = !this.done
    }

    /**项目的复制 */
    get copy(): TodoItem {
        return this.toJSON()
    }
}
