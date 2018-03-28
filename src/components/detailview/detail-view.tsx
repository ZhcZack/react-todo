import * as React from "react";
import { TodoItem } from "../../model/interface";

interface DetailViewProps {
	item?: TodoItem;
	onCloseClicked(e: React.MouseEvent<HTMLSpanElement>): void;
	onDeleteClicked(e: React.MouseEvent<HTMLSpanElement>): void;
	onToggleClicked(e: React.MouseEvent<HTMLSpanElement>): void;
	onCommentsChange(value: string): void;
	onCopyToPrimary(e: React.MouseEvent<HTMLParagraphElement>): void;
	onCancelCopyToPrimary(e: React.MouseEvent<HTMLParagraphElement>): void;
	listName: string;
}

interface DetailViewState {
	comments: string;
}

export class DetailView extends React.Component<DetailViewProps, DetailViewState> {
	constructor(props: DetailViewProps) {
		super(props);
		this.state = {
			comments: this.props.item
				? this.props.item.comments ? this.props.item.comments : ""
				: "",
		};
	}

	componentWillReceiveProps(newProps: DetailViewProps) {
		this.setState({
			comments: newProps.item ? (newProps.item.comments ? newProps.item.comments : "") : "",
		});
	}

	render() {
		const item = this.props.item;
		if (!item) {
			return null;
		}
		const checkboxStatus = `custom-checkbox ${item.done ? "checked" : ""}`;
		return (
			<div id="detailview" className={item ? "" : "hide"}>
				<div className="title-content">
					<div className={checkboxStatus} onClick={this.props.onToggleClicked}>
						√
					</div>
					<span className="title">{item.name}</span>
				</div>
				<div className="primary-copy-area">
					{item.inPrimaryList ? (
						<div>
							<p>已添加到“我的一天”</p>
							<span
								className="cancel-button"
								onClick={this.props.onCancelCopyToPrimary}>
								X
							</span>
						</div>
					) : (
						<p className="copy-button" onClick={this.props.onCopyToPrimary}>
							添加到“我的一天”
						</p>
					)}
				</div>
				<textarea
					className="detailitem-comments"
					value={this.state.comments}
					onChange={e => {
						e.stopPropagation();
						this.setState({ comments: e.target.value });
					}}
					onBlur={e => {
						e.stopPropagation();
						this.props.onCommentsChange(this.state.comments);
					}}
					placeholder="添加备注"
				/>
				<div className="actions">
					<span className="disappear" onClick={this.props.onCloseClicked}>
						&gt;
					</span>
					<span className="create-time">创建于{item.time}</span>
					<span className="delete" onClick={this.props.onDeleteClicked}>
						删除
					</span>
				</div>
			</div>
		);
	}
}
