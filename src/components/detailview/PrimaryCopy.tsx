/**
 * 将todo事项复制到`primary list`中，或者将todo从`primary list`中移除
 *
 */

import * as React from "react"
import { TodoItem } from "../../model/interface"

// 样式表
import styles from "./PrimaryCopy.module.css"

interface Props {
    item: TodoItem;
    onCancelCopyToPrimary(): void;
    onCopyToPrimary(): void;
}

export function PrimaryCopy(props: Props) {
    return (
        <div className={styles.primaryCopy}>
            {props.item.inPrimaryList ? (
                <div className={styles.copyArea}>
                    <p className={styles.copyText}>已添加到“我的一天”</p>
                    <span
                        className={styles.cancelButton}
                        onClick={props.onCancelCopyToPrimary}
                    >
                            X
                        </span>
                </div>
            ) : (
                <p className={styles.copyButton} onClick={props.onCopyToPrimary}>
                    添加到“我的一天”
                </p>
            )}
        </div>
    )
}