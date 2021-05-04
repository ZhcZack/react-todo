/**
 * 操作列表的弹出窗口
 *
 * 可以重命名和删除列表，也也可以显示/隐藏已完成的todo事项
 */

import * as React from 'react';
import { ThemePicker } from '../areaview/ThemePicker';
import { ActionButton } from './AreaActionButton';

// 样式表
import styles from './AreaActions.module.css';

interface Props {
    /**
     * 是否要显示已完成的项目
     */
    doneItemsDisplay: boolean;

    /**
     * 改变列表的主题色
     * @param color 主题颜色
     */
    onColorPick(color: string): void;

    /**
     * 切换已完成todo的显示状态
     */
    switchDoneItems(): void;

    /**
     * 重命名列表
     */
    renameClicked(): void;

    /**
     * 删除列表
     */
    deleteClicked(): void;

    /**
     * 关闭操作窗口
     */
    closeActions(): void;
}

export function AreaActions(props: Props) {
    const closeAction = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => {
        e.stopPropagation();
        props.closeActions();
    };

    return (
        <div className={styles.globalBackground} onClick={props.closeActions} onBlur={props.closeActions}>
            <div className={`${'animated fadeIn'} ${styles.actions} ${styles.display}`}>
                <ThemePicker onColorPick={props.onColorPick}/>
                <ul className={styles.buttonList}>
                    <ActionButton
                        onClick={props.switchDoneItems}
                        text={(props.doneItemsDisplay ? '隐藏' : '显示') + '已完成的项目'}
                    />
                    <ActionButton onClick={props.renameClicked} text={'重命名列表'}/>
                    <ActionButton
                        onClick={props.deleteClicked}
                        text={'删除列表'}
                        style={{ color: 'red' }}
                    />
                </ul>
            </div>
        </div>
    );
}
