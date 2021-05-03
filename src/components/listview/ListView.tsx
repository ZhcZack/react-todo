/**
 * 列表区域组件
 *
 * 显示所有列表的名称，以及一个“添加新列表”按钮
 */

import * as React from 'react';
import { Content } from './Content';
import { AppTodoList, ListInfo } from '../../model/interface';
import AddListButton from './AddNewList';

// 样式表
// const styles: { [prop: string]: string } = require('./ListView.module.css');
import style from './ListView.module.css';

interface ListViewProps {
    /**
     * 所有列表名称
     */
    todoList: AppTodoList[];

    /**
     * 添加新列表
     */
    addNewList(): void;

    /**
     * 切换area view显示的列表
     */
    switchList(listName: string): void;

    /**
     * 鼠标放开拖拽成功后，处理放置的todo事项
     * @param targetListName 目标列表（鼠标放置处的列表）的名称
     */
    onDrop(targetListName: string): void;
}

export function ListView(props: ListViewProps) {
    return (
        <div className={style.listView}>
            <Content
                todoList={props.todoList}
                onClick={props.switchList}
                onDrop={props.onDrop}
            />
            <AddListButton onClick={props.addNewList}/>
        </div>
    );
}