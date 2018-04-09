/**
 * 操作窗口里的选项按钮
 */

import * as React from "react";
import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./AreaActionButton.css");

interface Props {
    /**
     * 可拓展的样式
     */
    style?: React.CSSProperties;
    /**
     * 按钮的点击事件
     */
    onClick(): void;
    /**
     * 按钮的文本内容
     */
    text: string;
}

interface State {}

export class ActionButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        // bind methods
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <li className={styles.button} onClick={this.handleClick}>
                {this.props.text}
            </li>
        );
    }

    /**
     * 点击按钮，具体的功能由父组件决定
     */
    private handleClick(e: React.MouseEvent<HTMLLIElement>) {
        e.stopPropagation();
        this.props.onClick();
    }
}
