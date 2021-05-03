/**
 * 全局提示框里的按钮
 *
 * （就是“好的”，“确认”这种）
 *
 * 这个组件只提供基本的操作逻辑和样式，按钮具体的功能（onClick）需要父组件指定
 *
 * 目前还没有提供拓展样式，后续加上
 */

import * as React from "react"

// 样式表
import styles from "./GlobalAlertButton.module.css"

interface Props {
    title: string;
    onClick(): void;
}

export function AlertButton(props: Props) {
    return (
        <button className={styles.alertButton} onClick={props.onClick}>
            {props.title}
        </button>
    )
}
