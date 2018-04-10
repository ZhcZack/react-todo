/**
 * 操作列表的弹出窗口
 *
 * 可以重命名和删除列表，也也可以显示/隐藏已完成的todo事项
 */

import * as React from 'react';
import { ThemePicker } from '../areaview/ThemePicker';
import { ActionButton } from './AreaActionButton';

// 样式表
const styles: { [prop: string]: string } = require('./AreaActions.css');

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

interface State {}

export class AreaActions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.globalBackground} onClick={this.closeActions}>
                <div className={`${'animated fadeIn'} ${styles.actions} ${styles.display}`}>
                    <ThemePicker onColorPick={this.props.onColorPick} />
                    <ul className={styles.buttonList}>
                        <ActionButton
                            onClick={this.props.switchDoneItems}
                            text={(this.props.doneItemsDisplay ? '隐藏' : '显示') + '已完成的项目'}
                        />
                        <ActionButton onClick={this.props.renameClicked} text={'重命名列表'} />
                        <ActionButton
                            onClick={this.props.deleteClicked}
                            text={'删除列表'}
                            style={{ color: 'red' }}
                        />
                    </ul>
                </div>
            </div>
        );
    }

    /**
     * 关闭操作窗口
     */
    private closeActions = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        this.props.closeActions();
    };
}
