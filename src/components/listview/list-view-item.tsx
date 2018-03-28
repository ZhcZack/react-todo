import * as React from "react";
import { ListInfo } from "../../model/interface";

interface ListViewItemProps {
	/**当前进行编辑操作的列表名称 */
	// currentListName: string
	/**此列表的信息 */
	info: ListInfo;
	/**列表点击处理方法 */
	onClick(e: React.MouseEvent<HTMLLIElement>, itemName: string): void;
	/**
	 * 拖拽之后“放置”元素的处理方法
	 *
	 * @param targetListName todo事项要被“放置”的列表名称
	 */
	onDrop(targetListName: string): void;
}

export class ListViewItem extends React.Component<ListViewItemProps, {}> {
	constructor(props: ListViewItemProps) {
		super(props);

		// bind methods
		this.handleDragOver = this.handleDragOver.bind(this);
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragEnter = this.handleDragEnter.bind(this);
		this.handleDragLeave = this.handleDragLeave.bind(this);
	}

	/**
	 * 当元素被拖拽到这里的时候，拖拽结束触发这个方法
	 * @param e 拖拽事件
	 */
	private handleDragOver(e: React.DragEvent<HTMLLIElement>) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	}

	/**
	 * 元素“放”在这里的时候，触发这个方法。
	 *
	 * 这里把处理数据的工作交由父组件代劳
	 * @param e 拖拽事件
	 */
	private handleDrop(e: React.DragEvent<HTMLLIElement>) {
		e.preventDefault();
		let target = e.target as HTMLElement;
		if (target.nodeName.toLowerCase() !== "li") {
			if (target.parentElement) {
				target = target.parentElement;
			}
		}
		target.classList.remove("drag-enter");
		// const data = e.dataTransfer.getData('text')
		// console.log(`drop data: ${data}`)
		this.props.onDrop(this.props.info.name);
		// console.log('拖拽结束目标列表名称：' + this.props.info.name)
	}

	private handleDragEnter(e: React.DragEvent<HTMLLIElement>) {
		const target = e.target as HTMLElement;
		target.classList.add("drag-enter");
	}

	private handleDragLeave(e: React.DragEvent<HTMLLIElement>) {
		const target = e.target as HTMLElement;
		target.classList.remove("drag-enter");
	}

	render() {
		const isActive = this.props.info.isActive;
		return (
			<li
				onDragOver={this.handleDragOver}
				onDrop={this.handleDrop}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				className={isActive ? "list-item active" : "list-item"}
				onClick={e => this.props.onClick(e, this.props.info.name)}>
				<span className={isActive ? "item-name animated fadeIn" : "item-name animated"}>
					{this.props.info.name}
				</span>
				<span className="number-of-items">
					{this.props.info.count > 0 ? this.props.info.count : ""}
				</span>
			</li>
		);
	}
}
