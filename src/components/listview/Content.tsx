/**
 * 显示所有列表的区域
 */

import * as React from 'react';
import { AppTodoList, ListInfo } from '../../model/interface';
import { ViewItem } from './ViewItem';

// 样式表
// const styles: { [prop: string]: string } = require('./Content.module.css');
import style from "./Content.module.css"

interface Props {
    /**
     * 所有列表的信息
     */
    todoList: AppTodoList[];
    /**
     * 列表的点击事件，用于切换编辑的列表
     */
    onClick(list: AppTodoList): void;
    /**
     * 拖拽事件处理方法，用于“放置”todo事项
     */
    onDrop(targetListName: string): void;
}

interface State {}

export class Content extends React.Component<Props, State> {
    render() {
        return (
            <ul className={style.content}>
                {this.props.todoList.map(list => (
                    <ViewItem
                        // currentListName={this.props.currentListName}
                        list={list}
                        onClick={this.props.onClick}
                        onDrop={this.props.onDrop}
                        key={list.id}
                    />
                ))}
            </ul>
        );
    }
}
