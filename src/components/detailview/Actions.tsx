/**
 * detail view底部的操作区域组件
 *
 * 提供“关闭detail view”以及“删除todo”的功能
 */

import * as React from 'react';
import { TodoItem } from '../../model/interface';

// 样式表
import styles from './Actions.module.css';

interface Props {
    item: TodoItem;

    onCloseClicked(): void;

    onDeleteClicked(): void;
}

export function Actions(props: Props) {
    return (
        <div className={styles.actions}>
                <span className={styles.sideButton} onClick={props.onCloseClicked}>
                    &gt;
                </span>
            <span className={styles.timeLabel}>创建于{props.item.time}</span>
            <span className={styles.sideButton} onClick={props.onDeleteClicked}>
                    删除
                </span>
        </div>
    );
}