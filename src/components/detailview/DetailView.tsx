/**
 * 显示todo详细内容的区域
 *
 * 可以切换todo的完成状态、修改/添加备注信息、将todo复制到primary list，以及删除该todo
 */

import * as React from "react";
import { TodoItem } from "../../model/interface";
import { Actions } from "./Actions";
import { Comments } from "./Comments";
import { PrimaryCopy } from "./PrimaryCopy";
import { TitleContent } from "./TitleContent";

// 样式表
const styles: { [prop: string]: string } = require("./DetailView.css");

interface DetailViewProps {
    item?: TodoItem;
    onCloseClicked(): void;
    onDeleteClicked(): void;
    onToggleClicked(): void;
    onCommentsChange(value: string): void;
    onCopyToPrimary(): void;
    onCancelCopyToPrimary(): void;
    listName: string;
}

interface DetailViewState {}

export class DetailView extends React.Component<DetailViewProps, DetailViewState> {
    render() {
        const item = this.props.item;
        if (!item) {
            return null;
        }
        return (
            <div id={styles.detailView} className={this.props.item ? `` : `${styles.disappear}`}>
                <TitleContent item={item} onToggleClicked={this.props.onToggleClicked} />
                <PrimaryCopy
                    item={item}
                    onCancelCopyToPrimary={this.props.onCancelCopyToPrimary}
                    onCopyToPrimary={this.props.onCopyToPrimary}
                />
                <Comments
                    onCommentsChange={this.props.onCommentsChange}
                    initComments={
                        this.props.item
                            ? this.props.item.comments ? this.props.item.comments : ""
                            : ""
                    }
                />
                <Actions
                    onCloseClicked={this.props.onCloseClicked}
                    onDeleteClicked={this.props.onDeleteClicked}
                    item={item}
                />
            </div>
        );
    }
}
