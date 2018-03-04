import * as React from 'react'
import { ListServer } from './list-server'

interface ListViewProps {
    currentListName: string
    switchList(listName: string): void
}

interface ListViewState {
    listNames: string[]
}


export class ListView extends React.Component<ListViewProps, ListViewState> {
    private server: ListServer
    private count: number

    constructor(props: ListViewProps) {
        super(props)
        this.server = new ListServer()
        this.count = -1
        this.state = {
            listNames: []
        }

        // bind methods 
        this.addNewList = this.addNewList.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {
        const names = this.server.names
        this.setState({ listNames: names })
    }

    /**
     * 用户点击处理函数
     * @param e `click`事件
     */
    handleClick(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation()
        const target = e.target as HTMLElement
        const itemNameElement = target.firstElementChild
        if (!itemNameElement) {
            return
        }
        const name = itemNameElement.textContent
        if (!name) {
            return
        }
        // console.log('handleClick: name is ' + name)
        this.props.switchList(name)
    }

    /**
     * 添加新列表 
     */
    private addNewList() {
        let names = this.server.names
        let name = this.getListName()
        while (true) {
            if (names.indexOf(name) !== -1) {
                name = this.getListName()
            } else {
                break
            }
        }
        names.push(name)
        this.server.addNewList(name)
        this.setState({ listNames: names })
    }

    /**
     * 返回添加的新列表的名称
     */
    private getListName(): string {
        this.count++
        return `无命名清单${this.count > 0 ? this.count : ''}`
    }

    render() {
        return (
            <div id="listview">
                <ul>
                    {this.state.listNames.map(name => <li className={this.props.currentListName === name ? 'list-item active' : 'list-item'} key={name} onClick={this.handleClick}>
                        <span className="item-name">{name}</span>
                        <span className="number-of-items"></span>
                    </li>)}
                </ul>
                <div id="add-new-list" onClick={this.addNewList}>新建清单</div>
            </div>
        )
    }
}