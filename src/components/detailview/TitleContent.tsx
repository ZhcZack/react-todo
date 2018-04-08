import * as React from "react";
import { TodoItem } from "../../model/interface";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./TitleContent.css");

interface DetailTitleContentProps {
    item: TodoItem;
    onToggleClicked(): void;
}

interface DetailTitleContentState {
    // checkboxHover: boolean;
}

/**
 * 名称部分的样式
 */
// const contentStyles = {
//     minHeight: 80,
//     padding: "10px 10px 20px 10px",
//     borderBottom: "1px solid rgba(206, 197, 197, 0.5)",
//     backgroundColor: "white",
//     display: "flex",
// };
/**
 * 自定义checkbox的样式
 */
// const checkboxStyles = {
//     flex: "1 0 30px",
//     fontSize: "1.5rem",
//     width: 30,
//     height: 30,
//     margin: "0 10px",
//     borderRadius: "50%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     border: "1px solid gray",
//     color: "transparent",
//     backgroundColor: "transparent",
//     cursor: "pointer",
//     transition: "color 0.3s, background-color 0.3s",
// } as React.CSSProperties;
/**
 * checkbox的hover状态
 */
// const checkboxHoverStyles = {
//     color: "white",
//     backgroundColor: "gray",
// };
/**
 * checkbox的checked状态
 */
// const checkedBoxStyle = {
//     color: "white",
//     backgroundColor: "green",
// };
/**
 * todo名称label的样式
 */
// const titleLabelStyles = {
//     flex: "4 0 calc(100% - 50px)",
//     fontWeight: "bold",
//     wordBreak: "break-all",
// } as React.CSSProperties;

export class TitleContent extends React.Component<
    DetailTitleContentProps,
    DetailTitleContentState
> {
    constructor(props: DetailTitleContentProps) {
        super(props);
        // this.state = {
        //     checkboxHover: false,
        // };

        // bind methods
        this.handleToggleClicked = this.handleToggleClicked.bind(this);
        this.handleCheckboxMouseEnter = this.handleCheckboxMouseEnter.bind(this);
        this.handleCheckboxMouseLeave = this.handleCheckboxMouseLeave.bind(this);
    }

    private handleCheckboxMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        this.setState({
            checkboxHover: true,
        });
    }

    private handleCheckboxMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        this.setState({
            checkboxHover: false,
        });
    }

    private handleToggleClicked(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
        this.props.onToggleClicked();
    }

    render() {
        // let checkStyle = mix(checkboxStyles);
        // if (this.props.item.done) {
        //     checkStyle = mix(checkStyle, checkedBoxStyle);
        // }
        // if (this.state.checkboxHover) {
        //     checkStyle = mix(checkStyle, checkboxHoverStyles);
        // }
        return (
            <div className={styles.titleContent}>
                <div
                    // style={checkStyle}
                    className={
                        this.props.item.done
                            ? styles.checkedbox + " " + styles.checkbox
                            : styles.checkbox
                    }
                    onClick={this.handleToggleClicked}
                    // onMouseEnter={this.handleCheckboxMouseEnter}
                    // onMouseLeave={this.handleCheckboxMouseLeave}
                >
                    √
                </div>
                <span className={styles.titleLabel}>{this.props.item.name}</span>
            </div>
        );
    }
}
