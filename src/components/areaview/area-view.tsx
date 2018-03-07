import * as React from 'react';
import { TodoItem, TodoList } from '../../interface';
import { DetailView } from './../detail-view';
import { AddNewItem } from './add-new-item';
import { AreaViewContent } from './area-view-content';
import { EditableHead } from './editable-head';

interface AreaViewProps {
    listName: string
    todoItems: TodoItem[]
    renameList(oldName: string, newName: string): void
    deleteList(name: string): void
}

interface AreaViewState {
    detailItem?: TodoItem;
    inputValue: string;
}

export class AreaView extends React.Component<AreaViewProps, AreaViewState> {

    constructor(props: AreaViewProps) {
        super(props);
        this.state = {
            detailItem: undefined,
            inputValue: ''
        };

        // bind methods
        this.handleInput = this.handleInput.bind(this);
        this.cancelInput = this.cancelInput.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
        this.toggleItemFromDetailView = this.toggleItemFromDetailView.bind(this);
        this.displayDetailView = this.displayDetailView.bind(this);
        this.hideDetailView = this.hideDetailView.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.renameList = this.renameList.bind(this)
    }

    render() {
        return (
            <div id="areaview-area">
                <div id="areaview" className={this.state.detailItem ? 'shrink' : ''}>
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
                {this.state.detailItem && <DetailView
                    item={this.state.detailItem}
                    onCloseClicked={this.hideDetailView}
                    onDeleteClicked={this.deleteItem}
                    onToggleClicked={this.toggleItemFromDetailView} />}
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
        const value = e.target.value;
        this.setState({
            inputValue: value
        });
    }

    /**
     * 切换item的完成状态
     * @param e 鼠标点击事件
     * @param name `TodoItem`的名称
     */
    private toggleItem(e: React.MouseEvent<HTMLDivElement>, name: string) {
        e.stopPropagation();
        // 切换完成状态
    }

    /**
     * 在detail view中切换item的完成状态
     * @param e 鼠标点击事件
     */
    private toggleItemFromDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        if (!this.state.detailItem) { return; }
        const item = JSON.parse(JSON.stringify(this.state.detailItem!)) as TodoItem;
        item.done = !item.done;
        this.setState({ detailItem: item });
        this.toggleItem(e as React.MouseEvent<HTMLDivElement>, item.name);
    }

    /**
     * 添加新的`TodoItem`
     * @param e 鼠标点击事件
     */
    private addNewItem(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
    }

    /**
     * 中止文本框输入
     * @param e 鼠标点击事件
     */
    private cancelInput(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.setState({ inputValue: '' });
    }

    /**
     * 在detail view显示选中`TodoItem`的详细内容
     * @param e 鼠标点击事件
     * @param name 选中`TodoItem`的名称
     */
    private displayDetailView(e: React.MouseEvent<HTMLLIElement>, name: string) {
        // this.setState({
        //     detailItem: item
        // });
    }

    /**
     * 关闭detail view
     * @param e 鼠标点击事件
     */
    private hideDetailView(e: React.MouseEvent<HTMLSpanElement>) {
        this.setState({
            detailItem: undefined
        });
    }

    /**
     * 删除detail view中显示的`TodoItem`
     * @param e 鼠标点击事件
     */
    private deleteItem(e: React.MouseEvent<HTMLSpanElement>) {
        if (!this.state.detailItem) { return; }
    }
}