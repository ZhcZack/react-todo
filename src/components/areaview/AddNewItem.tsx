/**
 * 添加新todo事项的组件
 *
 * 根据输入的内容自动显示/隐藏“添加”、“取消”按钮
 */

import * as React from 'react';

// 样式表
import styles from './AddNewItem.module.css';

interface Props {
    /**
     * input的值，确保输入的内容与props的值保持一致
     */
    value: string;

    /**
     * 输入改变的事件处理函数
     */
    onValueChange(e: React.ChangeEvent<HTMLInputElement>): void;

    /**点
     * 击“添加”之后，添加新todo事项的处理函数
     */
    onAddClicked(): void;

    /**
     * 取消输入的处理函数
     */
    onCancelClicked(): void;
}

export function AddNewItem(props: Props) {
    const emptyValue = props.value === '';

    const handleAddClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        props.onAddClicked();
    };

    const handleCancelClicked = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        props.onCancelClicked();
    };

    return (
        <div className={styles.container}>
                <span className={emptyValue ? styles.symbol : styles.checkbox}>
                    {emptyValue ? '+' : ''}
                </span>
            <input
                type="text"
                className={styles.input}
                placeholder="添加代办事项"
                value={props.value}
                onChange={props.onValueChange}
            />
            <span
                className={emptyValue ? styles.hide : styles.close}
                onClick={handleCancelClicked}>
                    X
                </span>
            <span
                className={emptyValue ? styles.hide : styles.add}
                onClick={handleAddClick}>
                    添加
                </span>
        </div>

    );
}
