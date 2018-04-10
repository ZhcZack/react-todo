/**
 * 将todo事项复制到`primary list`中，或者将todo从`primary list`中移除
 *
 */

import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

// 样式表
const styles = require("./PrimaryCopy.css");

interface Props {
    item: TodoItem;
    onCancelCopyToPrimary(): void;
    onCopyToPrimary(): void;
}

interface State {}

export class PrimaryCopy extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // bind methods
        this.handleCancelCopyToPrimary = this.handleCancelCopyToPrimary.bind(this);
        this.handleCopyToPrimary = this.handleCopyToPrimary.bind(this);
    }

    /**
     * 从primary list中移除todo
     */
    private handleCancelCopyToPrimary(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onCancelCopyToPrimary();
    }

    /**
     * 复制copy到primary list中
     */
    private handleCopyToPrimary(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onCopyToPrimary();
    }

    render() {
        return (
            <div className={styles.primaryCopy}>
                {this.props.item.inPrimaryList ? (
                    <div className={styles.copyArea}>
                        <p className={styles.copyText}>已添加到“我的一天”</p>
                        <span
                            className={styles.cancelButton}
                            onClick={this.handleCancelCopyToPrimary}>
                            X
                        </span>
                    </div>
                ) : (
                    <p className={styles.copyButton} onClick={this.handleCopyToPrimary}>
                        添加到“我的一天”
                    </p>
                )}
            </div>
        );
    }
}
