import * as React from 'react';
import { TodoItem, TodoList } from '../../model/interface';
import { DetailView } from './../detailview/detail-view';
import { AddNewItem } from './add-new-item';
import { AreaViewContent } from './area-view-content';
import { EditableHead } from './editable-head';

interface AreaViewProps {
    /**列表名称 */
    listName: string
    /**列表下的所有todo事项 */
    todoItems: TodoItem[]
    /**列表是否要紧缩 */
    shrink: boolean
    /**todo事项点击，处理方法 */
    itemClicked(itemName: string, listName: string): void
    /**重命名列表，处理方法 */
    renameList(oldName: string, newName: string): void
    /**删除列表处理方法 */
    deleteList(name: string): void
    /**在列表中添加新todo项目，处理方法 */
    addNewItemInList(itemName: string, listName: string): void
    /**切换todo事项完成状态，处理方法 */
    toggleItemInList(itemName: string, listName: string): void
}

interface AreaViewState {
    /**文本框输入的数据内容 */
    inputValue: string
}

export class AreaView extends React.Component<AreaViewProps, AreaViewState> {

    constructor(props: AreaViewProps) {
        super(props)
        this.state = {
            inputValue: ''
        }

        // bind methods
        this.handleInput = this.handleInput.bind(this)
        this.cancelInput = this.cancelInput.bind(this)
        this.toggleItem = this.toggleItem.bind(this)
        this.displayDetailView = this.displayDetailView.bind(this)
        this.addNewItem = this.addNewItem.bind(this)
        this.renameList = this.renameList.bind(this)
    }

    render() {
        return (
            <div id="areaview" className={this.props.shrink ? 'shrink' : ''}>
                <EditableHead
                    listName={this.props.listName}
                    renameList={this.renameList}
                    deleteList={this.props.deleteList} />
                <AreaViewContent
                    items={this.props.todoItems}
                    checkboxClicked={this.toggleItem}
                    itemClicked={this.displayDetailView} />
                <AddNewItem
                    value={this.state.inputValue}
                    onValueChange={this.handleInput}
                    onAddClicked={this.addNewItem}
                    onCancelClicked={this.cancelInput}
                />
            </div>
        )
    }

    // componentDidMount() {
    //     this.server.listName = this.props.listName;
    // }

    componentWillReceiveProps(nextProps: AreaViewProps) {
    }

    /**
     * 更改列表名称
     * @param name 新的列表名称
     */
    private renameList(name: string) {
        this.props.renameList(this.props.listName, name)
    }

    /**
     * 处理文本框的输入内容
     * @param e input的`value`变动事件
     */
    private handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target)
        const value = e.target.value
        this.setState({
            inputValue: value
        })
    }

    /**
     * 切换item的完成状态
     * @param e 鼠标点击事件
     * @param name `TodoItem`的名称
     */
    private toggleItem(e: React.MouseEvent<HTMLDivElement>, name: string) {
        e.stopPropagation()
        // 切换完成状态
        this.props.toggleItemInList(name, this.props.listName)
    }

    /**
     * 添加新的`TodoItem`
     * @param e 鼠标点击事件
     */
    private addNewItem(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.props.addNewItemInList(this.state.inputValue, this.props.listName)
        this.setState({
            inputValue: ''
        })
    }

    /**
     * 中止文本框输入
     * @param e 鼠标点击事件
     */
    private cancelInput(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        this.setState({ inputValue: '' })
    }

    /**
     * 在detail view显示选中`TodoItem`的详细内容
     * @param e 鼠标点击事件
     * @param name 选中`TodoItem`的名称
     */
    private displayDetailView(e: React.MouseEvent<HTMLLIElement>, name: string) {
        this.props.itemClicked(name, this.props.listName)
    }
}