import * as React from "react";
import { ListInfo } from "../../model/interface";
import { ListViewItem } from "./list-view-item";

interface ListContentProps {
	/**所有列表的信息 */
	listInfos: ListInfo[];
	/**当前编辑的列表名称 */
	// currentListName: string
	/**列表的点击事件，用于切换编辑的列表 */
	onClick(e: React.MouseEvent<HTMLLIElement>, name: string): void;
	/**拖拽事件处理方法，用于“放置”todo事项 */
	onDrop(targetListName: string): void;
}

interface ListContentState {}

export class ListContent extends React.Component<ListContentProps, ListContentState> {
	render() {
		return (
			<ul>
				{this.props.listInfos.map(info => (
					<ListViewItem
						// currentListName={this.props.currentListName}
						info={info}
						onClick={this.props.onClick}
						onDrop={this.props.onDrop}
						key={info.name}
					/>
				))}
			</ul>
		);
	}
}
