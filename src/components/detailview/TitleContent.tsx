/**
 * 显示todo内容和完成状态的区域
 */

import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./TitleContent.css");

interface Props {
    item: TodoItem;
    /**
     * 切换todo的完成状态
     */
    onToggleClicked(): void;
}

interface State {}

export class TitleContent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // bind methods
        this.handleToggleClicked = this.handleToggleClicked.bind(this);
    }

    /**
     * 切换todo的完成状态
     */
    private handleToggleClicked(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        this.props.onToggleClicked();
    }

    render() {
        return (
            <div className={styles.titleContent}>
                <div
                    className={
                        this.props.item.done
                            ? styles.checkedbox + " " + styles.checkbox
                            : styles.checkbox
                    }
                    onClick={this.handleToggleClicked}>
                    √
                </div>
                <span className={styles.titleLabel}>{this.props.item.name}</span>
            </div>
        );
    }
}
