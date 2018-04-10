/**
 * 全局提示框里的按钮
 *
 * （就是“好的”，“确认”这种）
 *
 * 这个组件只提供基本的操作逻辑和样式，按钮具体的功能（onClick）需要父组件指定
 *
 * 目前还没有提供拓展样式，后续加上
 */

import * as React from "react";
import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./GlobalAlertButton.css");

interface Props {
    title: string;
    onClick(): void;
}

interface State {}

/**
 * 全局提示框里的按钮
 */
export class AlertButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    private onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        this.props.onClick();
    };

    render() {
        return (
            <button className={styles.alertButton} onClick={this.onClick}>
                {this.props.title}
            </button>
        );
    }
}
