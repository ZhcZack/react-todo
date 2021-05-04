/**
 * 显示每一个列表的组件
 *
 * 组件支持HTML5拖拽，可以将area view中的todo拖到列表上进行复制、转移操作。
 */

import * as React from 'react';
import { AppTodoList, ListInfo } from '../../model/interface';

// 样式表
// const styles: { [prop: string]: string } = require('./ViewItem.module.css');
import style from "./ViewItem.module.css"

interface Props {
    /**
     * 此列表的信息
     */
    list: AppTodoList;
    /**
     * 列表点击处理方法
     */
    onClick(list: AppTodoList): void;
    /**
     * 拖拽之后“放置”元素的处理方法
     *
     * @param targetListName todo事项要被“放置”的列表名称
     */
    onDrop(targetListName: string): void;
}

interface State {
    dragEnter: boolean;
}

export class ViewItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            dragEnter: false,
        };
    }

    render() {
        const isActive = this.props.list.active;
        const length = this.props.list.todos.filter(todo => !todo.done).length || ""
        return (
            <li
                className={`${this.state.dragEnter ? style.dragEnter : ''} ${style.listItem} ${
                    isActive ? style.active : ''
                }`}
                // style={listS}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onClick={this.clickList}
            >
                <span
                    className={`${style.itemName} animated ${
                        isActive ? style.active + ' fadeIn' : ''
                    }`}
                >
                    {this.props.list.name}
                </span>
                <span className={style.itemNumber}>
                    {length}
                </span>
            </li>
        );
    }

    /**
     * 当元素被拖拽到这里的时候，拖拽结束触发这个方法
     */
    private handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    /**
     * 元素“放”在这里的时候，触发这个方法。
     *
     * 这里把处理数据的工作交由父组件代劳
     */
    private handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
        let target = e.target as HTMLElement;
        if (target.nodeName.toLowerCase() !== 'li') {
            if (target.parentElement) {
                target = target.parentElement;
            }
        }
        // const data = e.dataTransfer.getData('text')
        // console.log(`drop data: ${data}`)
        this.props.onDrop(this.props.list.name);
        // console.log('拖拽结束目标列表名称：' + this.props.info.name)
        this.setState({
            dragEnter: false,
        });
    };

    /**
     * 列表处于`dragenter`状态时的操作
     */
    private handleDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation();
        // const target = e.target as HTMLElement;
        this.setState({
            dragEnter: true,
        });
    };

    /**
     * 列表处于`dragend`状态时的操作
     */
    private handleDragLeave = (e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation();
        // const target = e.target as HTMLElement;
        this.setState({
            dragEnter: false,
        });
    };

    /**
     * 点击列表，显示todo内容
     */
    private clickList = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        this.props.onClick(this.props.list);
    };
}
