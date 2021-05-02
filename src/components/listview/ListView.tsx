/**
 * 列表区域组件
 *
 * 显示所有列表的名称，以及一个“添加新列表”按钮
 */

import * as React from 'react';
import { Content } from './Content';
import { ListInfo } from '../../model/interface';
import AddListButton from './AddNewList';

// 样式表
// const styles: { [prop: string]: string } = require('./ListView.module.css');
import style from "./ListView.module.css"

interface ListViewProps {
    /**
     * 所有列表名称
     */
    listInfos: ListInfo[];
    /**
     * 添加新列表
     */
    addNewList(name: string): void;
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

interface ListViewState {}

/**
 * 列表目录
 */
export class ListView extends React.Component<ListViewProps, ListViewState> {
    /**
     * 用于命名新列表的计数器
     */
    private count: number;

    constructor(props: ListViewProps) {
        super(props);
        this.count = -1;
    }

    render() {
        return (
            <div className={style.listView}>
                <Content
                    listInfos={this.props.listInfos}
                    onClick={this.handleClick}
                    onDrop={this.props.onDrop}
                />
                <AddListButton onClick={this.addNewList} />
            </div>
        );
    }

    /**
     * 切换列表，显示列表中的todo
     */
    private handleClick = (name: string) => {
        // console.log('handleClick: name is ' + name);
        this.props.switchList(name);
    };

    /**
     * 添加新列表
     */
    private addNewList = () => {
        let result = true;
        let name = '';
        while (result) {
            name = this.getListName();
            result = this.props.listInfos.some(list => {
                return list.name === name;
            });
        }
        this.props.addNewList(name);
    };

    /**
     * 返回添加的新列表的名称
     */
    private getListName = (): string => {
        this.count++;
        return `无命名清单${this.count > 0 ? this.count : ''}`;
    };
}
