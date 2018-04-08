import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";
// import * as styles from "./DetailPrimaryCopy.css"

const styles = require("./PrimaryCopy.css");

interface Props {
    item: TodoItem;
    onCancelCopyToPrimary(): void;
    onCopyToPrimary(): void;
}

interface State {
    // cancelButtonHover: boolean
    // copyButtonHover: boolean
}

// const primaryStyles: React.CSSProperties = {
//     width: "90%",
//     height: 40,
//     margin: "5%",
//     display: "flex",
//     border: "1px solid ,rgba(206, 197, 197, 0.5)",
//     backgroundColor: "white",
// };

/**
 * copy area直接子元素基本样式
 */
// const directChildStyles: React.CSSProperties = {
//     width: "100%",
//     display: "flex",
// };
/**
 * 添加到primary list后文字的样式
 */
// const textLabelStyles: React.CSSProperties = {
//     color: "blue",
//     flex: "1 0 100px",
//     display: "flex",
//     alignItems: "center",
//     padding: 10,
// };
/**
 * “取消添加到primary list”按钮的样式
 */
// const cancelButtonStyles: React.CSSProperties = {
//     flex: "0 0 40px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "0.8em",
//     cursor: "pointer",
// };
/**
 * “添加到primary list”按钮的样式
 */
// const copyButtonStyles: React.CSSProperties = {
//     padding: 10,
//     alignItems: "center",
//     cursor: "pointer",
// };
// const hoverStyles: React.CSSProperties = {
//     backgroundColor: "rgba(206, 197, 197, 0.2)",
// };

/**
 * “添加到primary list”按钮
 */
export class PrimaryCopy extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = {
        //   cancelButtonHover: false,
        //   copyButtonHover: false,
        // }

        // bind methods
        this.handleCancelCopyToPrimary = this.handleCancelCopyToPrimary.bind(this);
        this.handleCopyToPrimary = this.handleCopyToPrimary.bind(this);
        // this.handleCancelButtonMouseEnter = this.handleCancelButtonMouseEnter.bind(this)
        // this.handleCancelButtonMouseLeave = this.handleCancelButtonMouseLeave.bind(this)
        // this.handleCopyButtonMouseEnter = this.handleCopyButtonMouseEnter.bind(this)
        // this.handleCopyButtonMouseLeave = this.handleCopyButtonMouseLeave.bind(this)
    }

    /**
     * 从primary list中移除todo
     * @param e 鼠标事件
     */
    private handleCancelCopyToPrimary(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onCancelCopyToPrimary();
    }

    /**
     * 复制copy到primary list中
     * @param e 鼠标事件
     */
    private handleCopyToPrimary(e: React.MouseEvent<HTMLSpanElement>) {
        e.stopPropagation();
        this.props.onCopyToPrimary();
    }

    private handleCopyButtonMouseEnter(e: React.MouseEvent<HTMLParagraphElement>) {
        e.stopPropagation();
        this.setState({
            copyButtonHover: true,
        });
    }

    private handleCopyButtonMouseLeave(e: React.MouseEvent<HTMLParagraphElement>) {
        e.stopPropagation();
        this.setState({
            copyButtonHover: false,
        });
    }

    private handleCancelButtonMouseEnter(e: React.MouseEvent<HTMLParagraphElement>) {
        e.stopPropagation();
        this.setState({
            cancelButtonHover: true,
        });
    }

    private handleCancelButtonMouseLeave(e: React.MouseEvent<HTMLParagraphElement>) {
        e.stopPropagation();
        this.setState({
            cancelButtonHover: false,
        });
    }

    render() {
        // let cancelStyle = mix(cancelButtonStyles)
        // let copyStyle = mix(copyButtonStyles, directChildStyles)

        // if (this.state.cancelButtonHover) {
        //   cancelStyle = mix(cancelStyle, hoverStyles)
        // }
        // if (this.state.copyButtonHover) {
        //   copyStyle = mix(copyStyle, hoverStyles)
        // }
        return (
            <div className={styles.primaryCopy}>
                {this.props.item.inPrimaryList ? (
                    <div className={styles.copyArea}>
                        <p className={styles.copyText}>已添加到“我的一天”</p>
                        <span
                            className={styles.cancelButton}
                            onClick={this.handleCancelCopyToPrimary}
                            // onMouseEnter={this.handleCancelButtonMouseEnter}
                            // onMouseLeave={this.handleCancelButtonMouseLeave}
                        >
                            X
                        </span>
                    </div>
                ) : (
                    <p
                        className={styles.copyButton}
                        onClick={this.handleCopyToPrimary}
                        // onMouseEnter={this.handleCopyButtonMouseEnter}
                        // onMouseLeave={this.handleCopyButtonMouseLeave}
                    >
                        添加到“我的一天”
                    </p>
                )}
            </div>
        );
    }
}
