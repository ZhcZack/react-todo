/**
 * detail view底部的操作区域组件
 *
 * 提供“关闭detail view”以及“删除todo”的功能
 */

import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./Actions.css");

interface Props {
    onCloseClicked(): void;
    onDeleteClicked(): void;
    item: TodoItem;
}

interface State {}

export class Actions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    /**
     * 关闭detail view
     */
    private handleCloseClicked = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        this.props.onCloseClicked();
    };

    /**
     * 删除对应的todo
     */
    private handleDeleteClicked = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        this.props.onDeleteClicked();
    };

    render() {
        return (
            <div className={styles.actions}>
                <span className={styles.sideButton} onClick={this.handleCloseClicked}>
                    &gt;
                </span>
                <span className={styles.timeLabel}>创建于{this.props.item.time}</span>
                <span className={styles.sideButton} onClick={this.handleDeleteClicked}>
                    删除
                </span>
            </div>
        );
    }
}
