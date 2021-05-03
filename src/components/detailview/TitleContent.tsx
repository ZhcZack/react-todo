/**
 * 显示todo内容和完成状态的区域
 */

import * as React from "react"
import { TodoItem } from "../../model/interface"

// 样式表
import styles from "./TitleContent.module.css"

interface Props {
    item: TodoItem;
    /**
     * 切换todo的完成状态
     */
    onToggleClicked(): void;
}

export function TitleContent(props: Props) {
    return (
        <div className={styles.titleContent}>
            <div
                className={
                    props.item.done
                        ? styles.checkedbox + " " + styles.checkbox
                        : styles.checkbox}
                onClick={props.onToggleClicked}>
                √
            </div>
            <span className={styles.titleLabel}>{props.item.name}</span>
        </div>
    )
}