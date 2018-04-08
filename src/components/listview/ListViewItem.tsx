import * as React from "react";
import { ListInfo } from "../../model/interface";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./ListViewItem.css");

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

interface ListViewItemState {
    // hover: boolean;
    dragEnter: boolean;
}

/**
 * 列表名称的样式
 */
// const itemNameStyles = {
//   flex: "9 1 100px",
//   pointerEvents: "none",
// } as React.CSSProperties;
// const itemNameStylesWithActive = {
//   fontWeight: "bold",
// } as React.CSSProperties;
/**
 * 表示列表还有多少未完成todo事项数字的样式
 */
// const itemNumberStyles = {
//   flex: "1 1 20px",
//   textAlign: "center",
//   pointerEvents: "none",
// };

/**
 * 列表样式
 */
// const listItemStyles = {
//   height: 40,
//   display: "flex",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   cursor: "pointer",
//   border: "3px solid transparent",
// } as React.CSSProperties;

/**
 * 正常情况下列表hover样式
 */
// const listItemHover = {
//   backgroundColor: "rgba(206, 197, 197, 0.5)",
// };
/**
 * active时列表hover样式
 */
// const listItemActiveHover = {
//   backgroundColor: "#87ceeb",
// };
/**
 * active时列表的背景色样式
 */
// const listItemStylesWithActive = {
//   backgroundColor: "#abddf1",
// };

// const listItemDragEnter = {
//   border: "3px solid blue",
// };

export class ListViewItem extends React.Component<ListViewItemProps, ListViewItemState> {
    constructor(props: ListViewItemProps) {
        super(props);
        this.state = {
            // hover: false,
            dragEnter: false,
        };

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
        // const data = e.dataTransfer.getData('text')
        // console.log(`drop data: ${data}`)
        this.props.onDrop(this.props.info.name);
        // console.log('拖拽结束目标列表名称：' + this.props.info.name)
        this.setState({
            dragEnter: false,
        });
    }

    private handleDragEnter(e: React.DragEvent<HTMLLIElement>) {
        const target = e.target as HTMLElement;
        this.setState({
            dragEnter: true,
        });
    }

    private handleDragLeave(e: React.DragEvent<HTMLLIElement>) {
        const target = e.target as HTMLElement;
        this.setState({
            dragEnter: false,
        });
    }

    render() {
        const isActive = this.props.info.isActive;
        // const isHover = this.state.hover;
        // let listS: React.CSSProperties = listItemStyles;
        // let itemS = itemNameStyles;

        // if (isActive) {
        //     if (isHover) {
        //         listS = mix(listS, listItemActiveHover);
        //     } else {
        //         listS = mix(listS, listItemStylesWithActive);
        //     }
        //     itemS = mix(itemS, itemNameStylesWithActive);
        // } else {
        //     if (isHover) {
        //         listS = mix(listS, listItemHover);
        //     }
        // }

        return (
            <li
                className={`${this.state.dragEnter ? styles.dragEnter : ""} ${styles.listItem} ${
                    isActive ? styles.active : ""
                }`}
                // style={listS}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onClick={e => this.props.onClick(e, this.props.info.name)}>
                <span
                    className={`animated ${isActive ? styles.active + " fadeIn" : ""} ${
                        styles.itemName
                    }`}>
                    {this.props.info.name}
                </span>
                <span className={styles.itemNumber}>
                    {this.props.info.count > 0 ? this.props.info.count : ""}
                </span>
            </li>
        );
    }
}
