/**
 * “添加新列表”按钮组件
 */

import * as React from "react";
import { mix, log } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./AddNewList.css");

interface Props {
    onClick(): void;
}

interface State {}

export default class AddListButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * 点击按钮新建列表
     */
    private handleClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        this.props.onClick();
    }

    render() {
        return (
            <div className={styles.button} onClick={this.handleClick}>
                <span className={styles.text}>+</span>新建清单
            </div>
        );
    }
}
