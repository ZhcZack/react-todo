/**
 * AreaView的顶部区域，可对列表进行“重命名”，“删除”等操作。
 */

import * as React from "react";
import { ThemePicker } from "./ThemePicker";
import { AreaActions } from "./AreaActions";
// import { mix } from "../../lib";

// 样式表
const styles: { [prop: string]: string } = require("./EditableHead.css");

/**
 * 从父组件得到的数据
 */
interface HeadProps {
    /**列表名称 */
    listName: string;
    /**列表主题色 */
    colorTheme: string;
    /**重命名列表，处理方法 */
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
     * 是否要显示已完成的todo项目
     */
    doneItemsDisplay: boolean;
    /**该列表是否为“基础列表” */
    isPrimaryList: boolean;
    /**
     * 主题选择处理方法
     */
    onColorPick(color: string): void;
}

/**
 * 组件内部的状态
 */
interface HeadState {
    /**是否处于编辑状态 */
    isEdit: boolean;
    /**保存编辑后的名称，通过props的值初始化 */
    name: string;
    /**
     * 列表操作框是否显示
     */
    isActionDisplay: boolean;
}

export class EditableHead extends React.Component<HeadProps, HeadState> {
    // ref引用，是一个输入文本框
    private renameInput: HTMLInputElement | null;

    constructor(props: HeadProps) {
        super(props);
        this.renameInput = null;

        this.state = {
            isEdit: false,
            name: this.props.listName,
            isActionDisplay: false,
        };

        this.inputChange = this.inputChange.bind(this);
        this.renameClicked = this.renameClicked.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.switchDoneItems = this.switchDoneItems.bind(this);
        this.closeActions = this.closeActions.bind(this);
    }

    static getDerivedStateFromProps(nextProps: HeadProps, prevState: HeadState): HeadState {
        return {
            name: nextProps.listName,
            isEdit: false,
            isActionDisplay: false,
        };
    }

    /**
     * 保存输入的内容，作为新的列表名
     */
    private inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value,
        });
    }

    /**
     * 进行重命名工作
     */
    private renameClicked() {
        this.toggleActionsDisplay();

        this.setState({ isEdit: true }, () => {
            if (this.renameInput) {
                this.renameInput.focus();
                this.renameInput.value = this.props.listName;
            }
        });
    }

    /**
     * 确认删除列表操作
     */
    private deleteClicked() {
        this.props.shouldDeleteList();
    }

    /**
     * 显示/隐藏操作列表的视图
     */
    private handleSwitch(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        // this.props.onActionsDisplayClick();
        this.toggleActionsDisplay();
    }

    /**
     * 这个方法用于切换列表操作框，将它显示或隐藏。
     */
    private toggleActionsDisplay() {
        this.setState(prevState => ({
            isActionDisplay: !prevState.isActionDisplay,
        }));
    }

    /**
     * 当焦点从输入框移走时，进行列表的重命名工作
     */
    private inputBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.stopPropagation();
        this.props.renameList(this.state.name);
        this.setState({
            isEdit: false,
        });
    }

    /**
     * 显示/隐藏已完成的todo事项
     */
    private switchDoneItems() {
        this.props.switchDoneItems();
        this.toggleActionsDisplay();
    }

    /**
     * 关闭操作窗口
     */
    private closeActions() {
        this.setState({
            isActionDisplay: false,
        });
    }

    render() {
        const color = this.props.colorTheme;
        if (this.props.isPrimaryList) {
            return (
                <div
                    className={styles.head}
                    style={{
                        background: `linear-gradient(to right, ${color}, ${color + "b3"})`,
                    }}>
                    <div className={styles.headDirectChild + " " + styles.name}>
                        {this.props.listName}
                    </div>
                </div>
            );
        }
        return (
            <div
                className={styles.head}
                style={{
                    background: `linear-gradient(to right, ${color}, ${color + "b3"})`,
                }}>
                <div
                    className={`${styles.headDirectChild} ${styles.name} ${
                        this.state.isEdit ? styles.hide : ""
                    }`}>
                    {this.props.listName}
                </div>
                <input
                    className={`${styles.headDirectChild} ${styles.input} ${
                        this.state.isEdit ? "" : styles.hide
                    }`}
                    type="text"
                    onChange={this.inputChange}
                    ref={input => (this.renameInput = input)}
                    onBlur={this.inputBlur}
                />
                <div
                    className={styles.switcher}
                    style={{ backgroundColor: color }}
                    onClick={this.handleSwitch}>
                    ···
                </div>
                {this.state.isActionDisplay && (
                    <AreaActions
                        // actionsShouldDisplay={this.props.actionsShouldDisplay}
                        doneItemsDisplay={this.props.doneItemsDisplay}
                        onColorPick={this.props.onColorPick}
                        switchDoneItems={this.switchDoneItems}
                        renameClicked={this.renameClicked}
                        deleteClicked={this.deleteClicked}
                        closeActions={this.closeActions}
                    />
                )}
            </div>
        );
    }
}
