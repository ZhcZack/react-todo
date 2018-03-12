import * as React from 'react'
import { ListContent } from './list-content'
import { ListInfo } from '../../model/interface'

interface ListViewProps {
    /**当前进行处理的列表名称 */
    currentListName: string
    /**所有列表名称 */
    listInfos: ListInfo[]
    /**添加新列表 */
    addNewList(name: string): void
    /**切换area view显示的列表 */
    switchList(listName: string): void
    onDrop(targetListName: string): void
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
        this.addNewList = this.addNewList.bind(this)
        this.handleClick = this.handleClick.bind(this)
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
        e.stopPropagation()
        let name = this.getListName()
        this.props.addNewList(name)
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
                <ListContent
                    listInfos={this.props.listInfos}
                    currentListName={this.props.currentListName}
                    onClick={this.handleClick}
                    onDrop={this.props.onDrop} />
                <div id="add-new-list" onClick={this.addNewList}><span>+</span>新建清单</div>
            </div>
        );
    }
}