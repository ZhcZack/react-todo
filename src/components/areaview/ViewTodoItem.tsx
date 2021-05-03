/**
 * 显示todo事项的区域
 */

import * as React from 'react';
import { TodoItem } from '../../model/interface';

// 样式
import styles from './ViewTodoItem.module.css';

interface Props {
    /**
     * 显示内容所在的列表是不是基本列表
     *
     * 在非基本列表里，没有被添加到基本列表的todo是不显示来源列表（source）的；添加到基本列表的todo在来源处显示“我的一天”(primary list)
     *
     * 在基本列表里，所有todo都显示来源，且显示准确的来源信息
     *
     * 我也不知道为什么会有这样的设定，微软这么做我也这么做……
     */
    isPrimaryList: boolean;
    /**要
     * 显示的todo事项
     */
    item: TodoItem;

    /**
     * todo点击事件，用于显示详细信息
     */
    onItemClicked(itemName: string): void;

    /**
     * checkbox点击事件，用于切换todo的完成状态
     */
    onCheckboxClicked(item: TodoItem): void;

    /**
     * 拖拽开始事件的处理方法
     */
    onDragStart(data: string): void;

    /**
     * 拖拽结束事件的处理方法
     */
    onDragEnd(): void;
}

export function AreaViewItem(props: Props) {
    const item = props.item;

    const clickItem = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        props.onItemClicked(props.item.name);
    };

    const handleDrag = (e: React.DragEvent<HTMLLIElement>) => {
        const data = JSON.stringify(props.item);
        e.dataTransfer.setData('text/plain', '');
        e.dataTransfer.dropEffect = 'move';
        props.onDragStart(data);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
        e.stopPropagation();
        props.onDragEnd();
    };

    const handleClickCheckbox = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.onCheckboxClicked(props.item);
    };

    return (
        <li
            draggable={true}
            className={styles.todo}
            onClick={clickItem}
            onDragStart={handleDrag}
            onDragEnd={handleDragEnd}>
            <div
                className={`${styles.checkbox} ${item.done ? styles.checked : ''}`}
                onClick={handleClickCheckbox}>
                √
            </div>
            <div className={styles.text}>
                    <span className={item.done ? `${styles.text} ${styles.done}` : ''}>
                        {item.name}
                    </span>
                <div className={styles.source}>
                    {item.inPrimaryList && (
                        <span className={styles.comment + ' ' + styles.inPrimary}>
                                {props.isPrimaryList ? item.source : '我的一天'}
                            </span>
                    )}
                    {item.comments && <span className={styles.comment}>备注</span>}
                </div>
            </div>
        </li>
    );
}