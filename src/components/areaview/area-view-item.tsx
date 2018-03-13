import * as React from 'react'
import { TodoItem } from '../../model/interface'

interface AreaViewItemProps {
    /**要显示的todo事项 */
    item: TodoItem
    /**todo点击事件，用于显示详细信息 */
    onItemClicked(e: React.MouseEvent<HTMLLIElement>, itemName: string): void
    /**checkbox点击事件，用于切换todo的完成状态 */
    onCheckboxClicked(e: React.MouseEvent<HTMLDivElement>, itemName: string): void
    /**拖拽开始事件的处理方法 */
    onDragStart(data: string): void
    /**拖拽结束事件的处理方法 */
    onDragEnd(): void
}

export class AreaViewItem extends React.Component<AreaViewItemProps, {}> {
    constructor(props: AreaViewItemProps) {
        super(props)

        // bind methods
        this.handleDrag = this.handleDrag.bind(this)
        this.handleDragEnd = this.handleDragEnd.bind(this)
    }

    /**
     * 拖拽开始的处理方法，将todo的数据转化为字符串并交由父组件处理
     * @param e 拖拽开始事件
     */
    private handleDrag(e: React.DragEvent<HTMLLIElement>) {
        const data = JSON.stringify(this.props.item)
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.dropEffect = 'move'
        this.props.onDragStart(data)
    }

    /**
     * 拖拽结束/被取消了
     * @param e 拖拽结束/被取消的处理方法
     */
    private handleDragEnd(e: React.DragEvent<HTMLLIElement>) {
        this.props.onDragEnd()
    }

    render() {
        return (
            <li draggable={true} className="todo-item" key={this.props.item.name} onClick={e => this.props.onItemClicked(e, this.props.item.name)} onDragStart={this.handleDrag} onDragEnd={this.handleDragEnd}>
                <div className={this.props.item.done ? "custom-checkbox checked" : 'custom-checkbox'} onClick={e => this.props.onCheckboxClicked(e, this.props.item.name)}>√</div>
                <div className={this.props.item.done ? "todo-item-content done" : 'todo-item-content'}>
                    <span>{this.props.item.name}</span>
                    {this.props.item.comments && <span className='todo-item-content-comments'>备注</span>}
                </div>
            </li>
        )
    }
}