import * as React from 'react'
import { TodoItem } from '../interface'
import { DetailView } from './detailview'
import { ItemServer } from './item-server'
import { AddNewItem } from './add-new-item'
import { AreaViewContent } from './area-view-content'

interface AreaViewProps {
    listName: string
}

interface AreaViewState {
    items: TodoItem[]
    detailItem?: TodoItem
    inputValue: string
}

export class AreaView extends React.Component<AreaViewProps, AreaViewState> {
    private server: ItemServer

    constructor(props: AreaViewProps) {
        super(props)
        this.server = new ItemServer()
        this.state = {
            items: [],
            detailItem: undefined,
            inputValue: ''
        }

        // bind methods
        this.handleInput = this.handleInput.bind(this)
        this.toggleItem = this.toggleItem.bind(this)
        this.displayDetailView = this.displayDetailView.bind(this)
        this.addNewItem = this.addNewItem.bind(this)
    }

    /** 
     * 获取数据以渲染视图
     */
    componentWillMount() {
        this.server.listName = this.props.listName
        const items = this.server.items
        this.setState({ items })
    }

    private handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target)
        const value = e.target.value
        this.setState({
            inputValue: value
        })
    }

    private toggleItem(e: React.MouseEvent<HTMLDivElement>, name: string) {
        e.stopPropagation()
        // 切换完成状态
        this.server.toggleItem(name)
        const items = this.server.items
        this.setState({ items, inputValue: '' })
    }

    private addNewItem(e: React.MouseEvent<HTMLSpanElement>) {
        this.server.addNewItem(this.state.inputValue)
        const items = this.server.items
        this.setState({ items, inputValue: '' })
    }

    private cancelInput(e: React.MouseEvent<HTMLSpanElement>) {
        this.setState({ inputValue: '' })
    }

    private displayDetailView(e: React.MouseEvent<HTMLLIElement>, name: string) {
        const item = this.server.itemWithName(name)
        this.setState({
            detailItem: item
        })
    }

    render() {
        // TODO: areaview-content渲染视图内容
        return (
            <div id="areaview-area">
                <div id="areaview">
                    <div id="areaview-head">
                        <div className="name">{this.props.listName}</div>
                    </div>
                    <AreaViewContent
                        items={this.state.items}
                        checkboxClicked={this.toggleItem}
                        itemClicked={this.displayDetailView} />
                    <AddNewItem
                        value={this.state.inputValue}
                        onValueChange={this.handleInput}
                        onAddClicked={this.addNewItem}
                        onCancelClicked={this.cancelInput}
                    />
                </div>
                {this.state.detailItem && <DetailView item={this.state.detailItem} />}
            </div>
        )
    }
}