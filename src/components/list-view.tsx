import * as React from 'react';

interface ListViewProps {
    currentListName: string;
    listNames: string[];
    addNewList(name: string): void;
    switchList(listName: string): void;
}

interface ListViewState {

}

/**
 * 列表目录
 */
export class ListView extends React.Component<ListViewProps, ListViewState> {
    /**用于命名新列表的计数器 */
    private count: number;

    constructor(props: ListViewProps) {
        super(props);
        this.count = -1;

        // bind methods 
        this.addNewList = this.addNewList.bind(this);
        this.addNewList = this.addNewList.bind(this);
    }

    /**
     * 用户点击处理函数
     * @param e `click`事件
     */
    private handleClick(e: React.MouseEvent<HTMLLIElement>, name: string) {
        e.stopPropagation();
        // console.log('handleClick: name is ' + name);
        this.props.switchList(name);
    }

    /**
     * 添加新列表 
     */
    private addNewList(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        let name = this.getListName();
        this.props.addNewList(name);
    }

    /**
     * 返回添加的新列表的名称
     */
    private getListName(): string {
        this.count++;
        return `无命名清单${this.count > 0 ? this.count : ''}`;
    }

    render() {
        return (
            <div id="listview">
                <ul>
                    {this.props.listNames.map(name => <li className={this.props.currentListName === name ? 'list-item active' : 'list-item'} key={name} onClick={e => this.handleClick(e, name)}>
                        <span className="item-name">{name}</span>
                        <span className="number-of-items"></span>
                    </li>)}
                </ul>
                <div id="add-new-list" onClick={e => this.addNewList(e)}><span>+</span>新建清单</div>
            </div>
        );
    }
}