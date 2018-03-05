import * as React from 'react';
import { TodoItem } from '../interface';
import { DetailView } from './detail-view';
import { ItemServer } from './item-server';
import { AddNewItem } from './add-new-item';
import { AreaViewContent } from './area-view-content';

interface AreaViewProps {
    listName: string;
}

interface AreaViewState {
    items: TodoItem[];
    detailItem?: TodoItem;
    inputValue: string;
}

export class AreaView extends React.Component<AreaViewProps, AreaViewState> {
    private server: ItemServer;

    constructor(props: AreaViewProps) {
        super(props);
        this.server = new ItemServer();
        this.server.listName = this.props.listName;
        this.state = {
            items: this.server.items,
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
    }

    // componentDidMount() {
    //     this.server.listName = this.props.listName;
    // }

    componentWillReceiveProps(nextProps: AreaViewProps) {
        this.server.listName = nextProps.listName;
        const items = this.server.items;
        this.setState({ items });
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
        this.server.toggleItem(name);
        const items = this.server.items;
        this.setState({ items, inputValue: '' });
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
        this.server.addNewItem(this.state.inputValue);
        const items = this.server.items;
        this.setState({ items, inputValue: '' });
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
        const item = this.server.itemWithName(name);
        this.setState({
            detailItem: item
        });
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
        this.server.deleteItem(this.state.detailItem.name);
        const items = this.server.items;
        this.setState({ items, detailItem: undefined });
    }

    render() {
        return (
            <div id="areaview-area">
                <div id="areaview" className={this.state.detailItem ? 'shrink' : ''}>
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
                {this.state.detailItem && <DetailView
                    item={this.state.detailItem}
                    onCloseClicked={this.hideDetailView}
                    onDeleteClicked={this.deleteItem}
                    onToggleClicked={this.toggleItemFromDetailView} />}
            </div>
        )
    }
}