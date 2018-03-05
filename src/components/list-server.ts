/**
 * 列表服务，负责读取/新建/保存列表
 */
export class ListServer {
    /**列表项目 */
    private lists: string[];

    constructor() {
        this.lists = [];
        this.load();
    }

    /** 
     * 从本地数据（localStorage）中加载列表内容
     */
    private load() {
        const result = localStorage.getItem('todo-app-list');
        if (!result) {
            // 没有本地存储，那就新建一个
            this.lists = ['我的一天'];
        } else {
            this.lists = JSON.parse(result).lists;
        }
        this.save();
    }

    /**
     * 将`lists`中的内容保存到本地数据中
     */
    private save() {
        localStorage.setItem('todo-app-list', JSON.stringify({ lists: this.lists }));
    }

    /**列表项目的字符串数组 */
    get names(): string[] {
        return JSON.parse(JSON.stringify(this.lists));
    }

    /**
     * 添加一个新列表
     * @param name 新列表名称
     */
    addNewList(name: string) {
        if (this.lists.indexOf(name) !== -1) { return; }
        this.lists.push(name);
        this.save();
    }
}