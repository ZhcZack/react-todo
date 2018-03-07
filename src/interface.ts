/**Todo项目 */
export interface TodoItem {
    /**名称 */
    name: string
    /**是否已完成 */
    done: boolean
    /**创建时间 */
    time: string
}

/**列表格式，包含名称和保存的Todo项目 */
export interface TodoList {
    /**列表名称 */
    name: string
    /**Todo项目 */
    items: TodoItem[]
    /**项目数量 */
    count: number
}