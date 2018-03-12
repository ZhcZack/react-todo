import * as React from 'react'
import { TodoItem } from '../../model/interface'
import { AreaViewItem } from './area-view-item'

interface AreaViewContentProps {
    /**要显示的todo事项 */
    items: TodoItem[]
    /**切换todo事项的完成状态，处理方法 */
    checkboxClicked(e: React.MouseEvent<HTMLDivElement>, name: string): void
    /**在detail view里显示/编辑todo事项的详细内容，处理方法 */
    itemClicked(e: React.MouseEvent<HTMLLIElement>, name: string): void
    /**拖拽todo事项 */
    onDragStart(data: string): void
    /**拖拽结束 */
    onDragEnd(): void
}

interface AreaViewContentState {

}

export class AreaViewContent extends React.Component<AreaViewContentProps, AreaViewContentState> {
    render() {
        return (
            <div id="areaview-content">
                <ul>
                    {this.props.items.map(item =>
                        <AreaViewItem
                            item={item}
                            onItemClicked={this.props.itemClicked}
                            onCheckboxClicked={this.props.checkboxClicked}
                            onDragStart={this.props.onDragStart}
                            onDragEnd={this.props.onDragEnd} />)}
                </ul>
            </div>
        )
    }
}