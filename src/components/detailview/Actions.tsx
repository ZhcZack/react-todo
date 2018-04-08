import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./Actions.css");

interface Props {
    onCloseClicked(): void;
    onDeleteClicked(): void;
    item: TodoItem;
}

interface State {
    // disappearHover: boolean;
    // deleteHover: boolean;
}

/**
 * 整个actions bar的样式
 */
// const actionStyles = {
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   width: "100%",
//   height: 40,
//   display: "flex",
//   backgroundColor: "white",
// } as React.CSSProperties;

/**
 * 两侧按钮的样式
 */
// const sideButtonStyles = {
//   flex: "1 1 30px",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   cursor: "pointer",
// } as React.CSSProperties;

/**
 * 两侧按钮hover样式
 */
// const sideButtonHover = {
//   backgroundColor: "rgba(206, 197, 197, 0.5)",
// };

/**
 * 中间展示创建时间的标签的样式
 */
// const timeLabelStyles = {
//   flex: "8 1 auto",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// } as React.CSSProperties;

export class Actions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = {
        //   disappearHover: false,
        //   deleteHover: false,
        // };

        // bind methods
        // this.handleCloseMouseEnter = this.handleCloseMouseEnter.bind(this);
        // this.handleCloseMouseLeave = this.handleCloseMouseLeave.bind(this);
        // this.handleDeleteMouseEnter = this.handleDeleteMouseEnter.bind(this);
        // this.handleDeleteMouseLeave = this.handleDeleteMouseLeave.bind(this);
        this.handleCloseClicked = this.handleCloseClicked.bind(this);
        this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    }

    // private handleCloseMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
    //   e.stopPropagation();
    //   this.setState({
    //     disappearHover: true,
    //   });
    // }

    // private handleCloseMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
    //   e.stopPropagation();
    //   this.setState({
    //     disappearHover: false,
    //   });
    // }

    // private handleDeleteMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
    //   e.stopPropagation();
    //   this.setState({
    //     deleteHover: true,
    //   });
    // }

    // private handleDeleteMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
    //   e.stopPropagation();
    //   this.setState({
    //     deleteHover: false,
    //   });
    // }

    /**
     * 关闭detail view
     * @param e 鼠标点击事件
     */
    private handleCloseClicked(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onCloseClicked();
    }

    /**
     * 删除对应的todo
     * @param e 鼠标点击事件
     */
    private handleDeleteClicked(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onDeleteClicked();
    }

    render() {
        // let disappearStyle = mix(sideButtonStyles);
        // let deleteStyle = mix(sideButtonStyles);
        // if (this.state.disappearHover) {
        //     disappearStyle = mix(disappearStyle, sideButtonHover);
        // }
        // if (this.state.deleteHover) {
        //     deleteStyle = mix(deleteStyle, sideButtonHover);
        // }
        return (
            <div className={styles.actions}>
                <span
                    className={styles.sideButton}
                    onClick={this.handleCloseClicked}
                    // onMouseEnter={this.handleCloseMouseEnter}
                    // onMouseLeave={this.handleCloseMouseLeave}
                >
                    &gt;
                </span>
                <span className={styles.timeLabel}>创建于{this.props.item.time}</span>
                <span
                    className={styles.sideButton}
                    onClick={this.handleDeleteClicked}
                    // onMouseEnter={this.handleDeleteMouseEnter}
                    // onMouseLeave={this.handleDeleteMouseLeave}
                >
                    删除
                </span>
            </div>
        );
    }
}
