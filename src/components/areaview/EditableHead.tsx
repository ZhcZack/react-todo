/**
 * AreaView的顶部区域，可对列表进行“重命名”，“删除”等操作。
 */

import * as React from 'react';
import { AreaActions } from './AreaActions';
// import { mix } from "../../lib";

// 样式表
import styles from './EditableHead.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

/**
 * 从父组件得到的数据
 */
interface HeadProps {
    /**
     * 列表名称
     */
    listName: string;
    /**
     * 列表主题色
     */
    colorTheme: string;
    /**
     * 是否要显示已完成的todo项目
     */
    doneItemsDisplay: boolean;
    /**
     * 该列表是否为“基础列表”
     */
    isPrimaryList: boolean;

    /**
     * 重命名列表，处理方法
     */
    renameList(name: string): void;

    /**
     * 是否要删除列表
     */
    shouldDeleteList(): void;

    /**
     * 显示/隐藏已完成的todo事项
     */
    switchDoneItems(): void;

    /**
     * 主题选择处理方法
     */
    onColorPick(color: string): void;
}

export function EditableHead(props: HeadProps) {
    const inputEl = useRef<HTMLInputElement>(null);
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
    const [actionDisplay, setActionDisplay] = useState(false);

    useEffect(() => {
        if (edit) {
            inputEl.current?.focus();
        }
    });

    function handleInputBlur() {
        setEdit(false);
        props.renameList(name);

    }

    function handleSwitchDoneClick() {
        setActionDisplay(false);
        props.switchDoneItems();
    }

    function handleRenameClick() {
        setActionDisplay(false);
        setEdit(true);
        setName(props.listName);
    }

    return (
        props.isPrimaryList ? (
            <div
                className={styles.head}
                style={{
                    background: `linear-gradient(to right, ${props.colorTheme}, ${props.colorTheme + 'b3'})`,
                }}>
                <div className={styles.headDirectChild + ' ' + styles.name}>
                    {props.listName}
                </div>
            </div>
        ) : (
            <div
                className={styles.head}
                style={{
                    background: `linear-gradient(to right, ${props.colorTheme}, ${props.colorTheme + 'b3'})`,
                }}>
                {edit ? <input
                        value={name}
                        className={`${styles.headDirectChild} ${styles.input} ${edit ? '' : styles.hide}`}
                        type="text"
                        onChange={e => setName(e.target.value)}
                        ref={inputEl}
                        onBlur={handleInputBlur}/>
                    : <div
                        className={`${styles.headDirectChild} ${styles.name} ${edit ? styles.hide : ''}`}>
                        {props.listName}
                    </div>}
                <div
                    className={styles.switcher}
                    style={{ backgroundColor: props.colorTheme }}
                    onClick={() => setActionDisplay(!actionDisplay)}>···
                </div>
                {actionDisplay && (
                    <AreaActions
                        doneItemsDisplay={props.doneItemsDisplay}
                        onColorPick={props.onColorPick}
                        switchDoneItems={handleSwitchDoneClick}
                        renameClicked={handleRenameClick}
                        deleteClicked={() => props.shouldDeleteList()}
                        closeActions={() => setActionDisplay(false)}/>
                )}
            </div>
        )
    );
}