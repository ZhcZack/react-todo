/**
 * “添加新列表”按钮组件
 */

import * as React from 'react';

// 样式表
// const styles: { [prop: string]: string } = require('./AddNewList.module.css');
import style from "./AddNewList.module.css"

interface Props {
    onClick(): void;
}

interface State {}

export default class AddListButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={style.button} onClick={this.handleClick}>
                <span className={style.text}>+</span>新建清单
            </div>
        );
    }

    /**
     * 点击按钮新建列表
     */
    private handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        this.props.onClick();
    };
}
