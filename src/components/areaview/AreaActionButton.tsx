/**
 * 操作窗口里的选项按钮
 */

import * as React from 'react';

// 样式表
import styles from './AreaActionButton.module.css';

interface Props {
    /**
     * 可拓展的样式
     */
    style?: React.CSSProperties;
    /**
     * 按钮的文本内容
     */
    text: string;

    /**
     * 按钮的点击事件
     */
    onClick(): void;
}

export function ActionButton(props: Props) {
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        props.onClick();
    };
    return (
        <li className={styles.button} onClick={handleClick}>{props.text}</li>
    );
}