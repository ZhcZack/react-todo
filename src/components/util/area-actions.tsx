import * as React from "react";
import { ColorThemePicker } from "../areaview/colortheme-picker";

interface AreaActionsProps {
	actionsShouldDisplay: boolean;
	doneItemsDisplay: boolean;
	onColorPick(color: string): void;
	switchDoneItems(e: React.MouseEvent<HTMLLIElement>): void;
	renameClicked(e: React.MouseEvent<HTMLLIElement>): void;
	deleteClicked(e: React.MouseEvent<HTMLLIElement>): void;
}

export class AreaActions extends React.Component<AreaActionsProps, {}> {
	render() {
		return (
			<div
				className={
					this.props.actionsShouldDisplay
						? "actions animated fadeIn actions-display"
						: "actions animated"
				}>
				<ColorThemePicker onColorPick={this.props.onColorPick} />
				<ul className="actions-list">
					<li className="action-showDoneItems" onClick={this.props.switchDoneItems}>
						{this.props.doneItemsDisplay ? "隐藏" : "显示"}已完成的项目
					</li>
					<li className="action-edit" onClick={this.props.renameClicked}>
						重命名列表
					</li>
					<li className="action-delete" onClick={this.props.deleteClicked}>
						删除列表
					</li>
				</ul>
			</div>
		);
	}
}
