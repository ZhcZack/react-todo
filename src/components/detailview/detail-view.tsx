import * as React from "react";
import { TodoItem } from "../../model/interface";
import DetailActions from "./detailActions";
import DetailComments from "./detailComments";
import DetailPrimaryCopy from "./detailPrimaryCopy";

interface DetailViewProps {
  item?: TodoItem;
  onCloseClicked(): void;
  onDeleteClicked(): void;
  onToggleClicked(e: React.MouseEvent<HTMLSpanElement>): void;
  onCommentsChange(value: string): void;
  onCopyToPrimary(): void;
  onCancelCopyToPrimary(): void;
  listName: string;
}

interface DetailViewState {}

/**
 * detail view的样式
 */
const detailViewStyles = {
  width: 280,
  position: "relative",
  overflow: "hidden",
  borderLeft: "1px solid rgba(206, 197, 197, 0.5)",
  backgroundColor: "rgba(206, 197, 197, 0.2)",
} as React.CSSProperties;
const detailViewDisappear = {
  width: 0,
};

export class DetailView extends React.Component<DetailViewProps, DetailViewState> {
  render() {
    const item = this.props.item;
    if (!item) {
      return null;
    }
    const checkboxStatus = `custom-checkbox ${item.done ? "checked" : ""}`;
    return (
      <div id="detailview" style={detailViewStyles}>
        <div className="title-content">
          <div className={checkboxStatus} onClick={this.props.onToggleClicked}>
            √
          </div>
          <span className="title">{item.name}</span>
        </div>
        <DetailPrimaryCopy
          item={item}
          onCancelCopyToPrimary={this.props.onCancelCopyToPrimary}
          onCopyToPrimary={this.props.onCopyToPrimary}
        />
        <DetailComments
          onCommentsChange={this.props.onCommentsChange}
          initComments={
            this.props.item ? (this.props.item.comments ? this.props.item.comments : "") : ""
          }
        />
        <DetailActions
          onCloseClicked={this.props.onCloseClicked}
          onDeleteClicked={this.props.onDeleteClicked}
          item={item}
        />
      </div>
    );
  }
}
