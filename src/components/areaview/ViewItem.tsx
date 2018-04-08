import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

// 样式
const styles: { [prop: string]: string } = require("./ViewItem.css");

interface AreaViewItemProps {
    isPrimary: boolean;
    /**要显示的todo事项 */
    item: TodoItem;
    /**todo点击事件，用于显示详细信息 */
    onItemClicked(e: React.MouseEvent<HTMLLIElement>, itemName: string): void;
    /**checkbox点击事件，用于切换todo的完成状态 */
    onCheckboxClicked(e: React.MouseEvent<HTMLDivElement>, itemName: string): void;
    /**拖拽开始事件的处理方法 */
    onDragStart(data: string): void;
    /**拖拽结束事件的处理方法 */
    onDragEnd(): void;
}

interface AreaViewItemState {
    // todoHover: boolean;
    // checkboxHover: boolean;
}

// const todoStyles = {
//     height: 60,
//     display: "flex",
//     alignItems: "center",
//     padding: "10px 0",
//     borderBottom: "1px solid rgba(206, 197, 197, 0.5)",
//     backgroundColor: "transparent",
//     transition: "background-color 0.3s",
// } as React.CSSProperties;
// const todoHover = {
//     backgroundColor: "rgba(206, 197, 197, 0.5)",
// };
/**
 * 自定义checkbox的样式
 */
// const checkboxStyles = {
//     fontSize: "1.5rem",
//     width: 30,
//     height: 30,
//     margin: "0 10px",
//     borderRadius: "50%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     border: "1px solid gray",
//     color: "transparent",
//     backgroundColor: "transparent",
//     cursor: "pointer",
//     transition: "color 0.3s, background-color 0.3s",
// } as React.CSSProperties;
// const checkboxHover = {
//     color: "white",
//     backgroundColor: "gray",
// };
// const checkedBox = {
//     color: "white",
//     backgroundColor: "green",
// };
/**
 * todo文字部分的样式
 */
// const itemStyles = {
//     display: "flex",
//     flexDirection: "column",
// } as React.CSSProperties;
/**
 * todo完成时文字部分的样式
 */
// const itemDoneStyles = {
//     textDecoration: "line-through",
//     color: "gray",
// } as React.CSSProperties;
/**
 * 备注等信息文字部分的样式
 */
// const itemExtraStyles = {
//     display: "flex",
// };
// const extraDirectChild = {
//     fontSize: "0.6em",
//     color: "gray",
//     marginRight: 10,
// };

export class AreaViewItem extends React.Component<AreaViewItemProps, AreaViewItemState> {
    constructor(props: AreaViewItemProps) {
        super(props);
        // this.state = {
        //   todoHover: false,
        //   checkboxHover: false,
        // };

        // bind methods
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        // this.handleTodoMouseEnter = this.handleTodoMouseEnter.bind(this);
        // this.handleTodoMouseLeave = this.handleTodoMouseLeave.bind(this);
        // this.handleCheckboxMouseEnter = this.handleCheckboxMouseEnter.bind(this);
        // this.handleCheckboxMouseLeave = this.handleCheckboxMouseLeave.bind(this);
    }

    /**
     * 拖拽开始的处理方法，将todo的数据转化为字符串并交由父组件处理
     * @param e 拖拽开始事件
     */
    private handleDrag(e: React.DragEvent<HTMLLIElement>) {
        const data = JSON.stringify(this.props.item);
        e.dataTransfer.setData("text/plain", "");
        e.dataTransfer.dropEffect = "move";
        this.props.onDragStart(data);
    }

    /**
     * 拖拽结束/被取消了
     * @param e 拖拽结束/被取消的处理方法
     */
    private handleDragEnd(e: React.DragEvent<HTMLLIElement>) {
        e.stopPropagation();
        this.props.onDragEnd();
    }

    // private handleTodoMouseEnter(e: React.MouseEvent<HTMLLIElement>) {
    //     e.stopPropagation();
    //     this.setState({
    //         todoHover: true,
    //     });
    // }

    // private handleTodoMouseLeave(e: React.MouseEvent<HTMLLIElement>) {
    //     e.stopPropagation();
    //     this.setState({
    //         todoHover: false,
    //     });
    // }

    render() {
        const item = this.props.item;
        // let todoS = todoStyles;
        // if (this.state.todoHover) {
        //     todoS = mix(todoS, todoHover);
        // }
        // let checkboxS = checkboxStyles;
        // if (item.done) {
        //     checkboxS = mix(checkboxS, checkedBox);
        // }
        // if (this.state.checkboxHover) {
        //     checkboxS = mix(checkboxS, checkboxHover);
        // }
        return (
            <li
                draggable={true}
                // style={todoS}
                className={styles.todo}
                onClick={e => this.props.onItemClicked(e, item.name)}
                onDragStart={this.handleDrag}
                onDragEnd={this.handleDragEnd}
                // onMouseEnter={this.handleTodoMouseEnter}
                // onMouseLeave={this.handleTodoMouseLeave}
            >
                <div
                    // style={checkboxS}
                    className={`${styles.checkbox} ${item.done ? styles.checked : ""}`}
                    onClick={e => this.props.onCheckboxClicked(e, item.name)}
                    // onMouseEnter={this.handleCheckboxMouseEnter}
                    // onMouseLeave={this.handleCheckboxMouseLeave}
                >
                    √
                </div>
                <div className={styles.text}>
                    <span className={item.done ? `${styles.text} ${styles.done}` : ""}>
                        {item.name}
                    </span>
                    {
                        <div className={styles.source}>
                            {item.inPrimaryList && (
                                <span className={styles.comment + " " + styles.inPrimary}>
                                    {this.props.isPrimary ? item.source : "我的一天"}
                                </span>
                            )}
                            {item.comments && <span className={styles.comment}>备注</span>}
                        </div>
                    }
                </div>
            </li>
        );
    }

    // private handleCheckboxMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    //     e.stopPropagation();
    //     this.setState({ checkboxHover: false });
    // }

    // private handleCheckboxMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    //     e.stopPropagation();
    //     this.setState({ checkboxHover: true });
    // }
}
