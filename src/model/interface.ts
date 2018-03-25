/**Todo项目 */
export interface TodoItem {
    /**名称 */
    name: string;
    /**是否已完成 */
    done: boolean;
    /**创建时间 */
    time: string;
    /**备注 */
    comments?: string;
}

/**列表格式，包含名称和保存的Todo项目 */
export interface TodoList {
    /**列表名称 */
    name: string;
    /**Todo项目 */
    items: TodoItem[];
    /**项目数量 */
    count: number;
}

/**列表信息 */
export interface ListInfo {
    /**
     * 列表名称
     */
    name: string;
    /**
     * 列表包含todo项目的数量
     */
    count: number;
    /**
     * 是否是当前选中的列表项
     */
    isActive: boolean;
    /**
     * 列表的主题色
     */
    theme: string;
    /**
     * 列表是否是基础列表
     */
    isPrimary: boolean;
}
