import * as React from 'react'
import { TodoItem } from '../interface'

interface AreaViewContentProps {
    items: TodoItem[]
    checkboxClicked(e: React.MouseEvent<HTMLDivElement>, name: string): void
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
                        <span className={item.done ? "todo-item-content done" : 'todo-item-content'}>{item.name}</span>
                    </li>)}
                </ul>
            </div>
        )
    }
}