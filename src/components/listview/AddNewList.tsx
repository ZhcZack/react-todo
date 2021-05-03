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

export default function AddListButton(props: Props) {
    return (
        <div className={style.button} onClick={props.onClick}>
            <span className={style.text}>+</span>新建清单
        </div>
    );
}