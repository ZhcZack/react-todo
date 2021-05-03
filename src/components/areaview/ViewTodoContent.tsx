/**
 * 显示todo列表内容的区域
 */

import * as React from "react"
import { TodoItem } from "../../model/interface"
import { AreaViewItem } from "./ViewTodoItem"

// 样式
import styles from "./ViewTodoContent.module.css"

interface Props {
    /**
     * 要显示的todo事项
     */
    items: TodoItem[];
    /**
     * 是否显示已标记为“完成”的项目
     */
    showDoneItems: boolean;
    /**
     * 这个区域所在的列表是不是基本列表
     *
     * 在基本列表里，todo标记完成后不会从显示区域中隐藏，会一直存在；而在其他列表中会看情况显示或隐藏。
     */
    isPrimaryList: boolean;
    /**
     * 切换todo事项的完成状态，处理方法
     */
    checkboxClicked(item: TodoItem): void;
    /**
     * 在detail view里显示/编辑todo事项的详细内容，处理方法
     */
    itemClicked(name: string): void;
    /**
     * 拖拽todo事项
     */
    onDragStart(data: string): void;
    /**
     * 拖拽结束
     */
    onDragEnd(): void;
}

interface State {}

export class AreaViewContent extends React.Component<Props, State> {
    render() {
        return (
            <div className={styles.content}>
                <ul className={styles.list}>{this.createList()}</ul>
            </div>
        )
    }
    /**
     * 根据todo的内容以及列表的状态生成`<li>`元素
     */
    private createList(): (JSX.Element | null)[] {
        return this.props.items.map(item => {
            if (this.props.showDoneItems) {
                return (
                    <AreaViewItem
                        isPrimaryList={this.props.isPrimaryList}
                        item={item}
                        onItemClicked={this.props.itemClicked}
                        onCheckboxClicked={this.props.checkboxClicked}
                        onDragStart={this.props.onDragStart}
                        onDragEnd={this.props.onDragEnd}
                        key={item.name}
                    />
                )
            }
            // primary list中的todo是不会被隐藏的，不在primary list中的才会被隐藏
            if (item.done && !this.props.isPrimaryList) {
                return null
            }
            return (
                <AreaViewItem
                    isPrimaryList={this.props.isPrimaryList}
                    item={item}
                    onItemClicked={this.props.itemClicked}
                    onCheckboxClicked={this.props.checkboxClicked}
                    onDragStart={this.props.onDragStart}
                    onDragEnd={this.props.onDragEnd}
                    key={item.name}
                />
            )
        })
    }
}
