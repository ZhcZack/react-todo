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

    // TODO: 更改名字的时候要转移数据
    // DONE：数据已转移
    /**
     * 更改列表名称
     * @param oldName 旧列表名
     * @param newName 新列表名
     */
    renameList(oldName: string, newName: string) {
        if (oldName === newName) { return }
        let index = this.lists.indexOf(oldName)
        if (index === -1) { return }
        this.lists.splice(index, 1, newName)
        this.lastModified = newName
        this.save()
    }

    /**
     * 删除列表
     * 
     * 删除成功返回`true`，失败返回`false`
     * @param name 要删除的列表名称
     */
    deleteList(name: string): boolean {
        let index = this.lists.indexOf(name)
        if (index === -1) {
            return false
        }
        if (this.lists.length <= 1) { return false }
        this.lists.splice(index, 1)
        localStorage.removeItem(name)
        this.lastModified = this.lists[0]
        this.save()
        return true
    }

    /**列表项目的字符串数组 */
    get names(): string[] {
        return JSON.parse(JSON.stringify(this.lists));
    }

    /**
     * 最后一次操作todo的列表名称
     */
    get lastModified(): string {
        let result = localStorage.getItem('list-name-before-closed');
        return result === null ? '我的一天' : result;
    }

    set lastModified(listName: string) {
        localStorage.setItem('list-name-before-closed', listName);
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