/**
 * 添加新todo事项的组件
 *
 * 根据输入的内容自动显示/隐藏“添加”、“取消”按钮
 */

import * as React from "react";
import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./AddNewItem.css");

interface Props {
    /**input的值，确保输入的内容与props的值保持一致 */
    value: string;
    /**输入改变的事件处理函数 */
    onValueChange(e: React.ChangeEvent<HTMLInputElement>): void;
    /**点击“添加”之后，添加新todo事项的处理函数 */
    onAddClicked(): void;
    /**取消输入的处理函数 */
    onCancelClicked(): void;
}

interface State {}

export class AddNewItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const emptyValue = this.props.value === "";

        return (
            <div className={styles.container}>
                <span className={emptyValue ? styles.symbol : styles.checkbox}>
                    {emptyValue ? "+" : ""}
                </span>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="添加代办事项"
                    value={this.props.value}
                    onChange={this.props.onValueChange}
                />
                <span
                    className={emptyValue ? styles.hide : styles.close}
                    onClick={this.handleCancelClicked}>
                    X
                </span>
                <span
                    className={emptyValue ? styles.hide : styles.add}
                    onClick={this.handleAddClicked}>
                    添加
                </span>
            </div>
        );
    }

    /**
     * 取消这次输入
     */
    private handleCancelClicked = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        this.props.onCancelClicked();
    };

    /**
     * 添加一个新的todo事项
     */
    private handleAddClicked = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        this.props.onAddClicked();
    };
}
