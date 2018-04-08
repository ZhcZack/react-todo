import * as React from "react";
import { ThemePicker } from "../areaview/ThemePicker";
import { mix } from "../../lib";
import { ActionButton } from "./ActionButton";

// 样式
const styles: { [prop: string]: string } = require("./AreaActions.css");

interface Props {
    /**
     * 是否显示操作区域
     */
    actionsShouldDisplay: boolean;
    /**
     * 是否要显示已完成的项目
     */
    doneItemsDisplay: boolean;
    onColorPick(color: string): void;
    switchDoneItems(): void;
    renameClicked(): void;
    deleteClicked(): void;
}

interface State {}

/**
 * 操作菜单的样式
 */
// const actionStyles = {
//     position: "absolute",
//     top: "calc(100% + 5px)",
//     right: 10,
//     visibility: "hidden",
//     width: 322,
//     listStyleType: "none",
//     backgroundColor: "white",
//     border: "1px solid rgba(206, 197, 197, 0.5)",
//     padding: 10,
//     marginRight: 0,
// } as React.CSSProperties;
// const actionDisplay = {
//     visibility: "visible",
// };

export class AreaActions extends React.Component<Props, State> {
    render() {
        const actionShouldDisplay = this.props.actionsShouldDisplay;

        return (
            <div
                className={`${actionShouldDisplay ? "animated fadeIn" : "animated"} ${
                    actionShouldDisplay ? `${styles.actions} ${styles.display}` : styles.actions
                }`}>
                <ThemePicker onColorPick={this.props.onColorPick} />
                <ul>
                    <ActionButton
                        onClick={this.props.switchDoneItems}
                        text={(this.props.doneItemsDisplay ? "隐藏" : "显示") + "已完成的项目"}
                    />
                    <ActionButton onClick={this.props.renameClicked} text={"重命名列表"} />
                    <ActionButton
                        onClick={this.props.deleteClicked}
                        text={"删除列表"}
                        style={{ color: "red" }}
                    />
                </ul>
            </div>
        );
    }
}
