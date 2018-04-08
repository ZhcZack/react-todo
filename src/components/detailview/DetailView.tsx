import * as React from "react";
import { TodoItem } from "../../model/interface";
import { Actions } from "./Actions";
import { Comments } from "./Comments";
import { PrimaryCopy } from "./PrimaryCopy";
import { TitleContent } from "./TitleContent";

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

/**
 * detail view的样式
 */
// const detailViewStyles = {
//   width: 280,
//   position: "relative",
//   overflow: "hidden",
//   borderLeft: "1px solid rgba(206, 197, 197, 0.5)",
//   backgroundColor: "rgba(206, 197, 197, 0.2)",
// } as React.CSSProperties;
// const detailViewDisappear = {
//   width: 0,
// };

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
