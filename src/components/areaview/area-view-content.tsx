import * as React from 'react'
import { TodoItem } from '../../model/interface'

interface AreaViewContentProps {
    /**要显示的todo事项 */
    items: TodoItem[]
    /**切换todo事项的完成状态，处理方法 */
    checkboxClicked(e: React.MouseEvent<HTMLDivElement>, name: string): void
    /**在detail view里显示/编辑todo事项的详细内容，处理方法 */
    itemClicked(e: React.MouseEvent<HTMLLIElement>, name: string): void
}

interface AreaViewContentState {

}

export class AreaViewContent extends React.Component<AreaViewContentProps, AreaViewContentState> {
    render() {
        return (
            <div id="areaview-content">
                <ul>
                    {this.props.items.map(item => <li className="todo-item" key={item.name} onClick={e => this.props.itemClicked(e, item.name)}>
                        <div className={item.done ? "custom-checkbox checked" : 'custom-checkbox'} onClick={e => this.props.checkboxClicked(e, item.name)}>√</div>
                        <div className={item.done ? "todo-item-content done" : 'todo-item-content'}>
                            <span>{item.name}</span>
                            {item.comments && <span className='todo-item-content-comments'>备注</span>}
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
}