import * as React from "react";
import { mix } from "../../lib";

const styles: { [prop: string]: string } = require("./GlobalAlertButton.css");

interface Props {
    title: string;
    onClick(): void;
}

interface State {
    // hover: boolean;
}

/**
 * 全局提示框里的按钮
 */
export class AlertButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = {
        //     hover: false,
        // };

        // this.onMouseEnter = this.onMouseEnter.bind(this);
        // this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    // private onMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    //     e.stopPropagation();
    //     this.setState({
    //         hover: true,
    //     });
    // }

    // private onMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    //     e.stopPropagation();
    //     this.setState({
    //         hover: false,
    //     });
    // }

    private onClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        this.props.onClick();
    }

    render() {
        // const style = this.state.hover
        //     ? mix(confirmButtonStyles, confirmButtonHover)
        //     : confirmButtonStyles;
        return (
            <button
                className={styles.alertButton}
                // style={style}
                // onMouseEnter={this.onMouseEnter}
                // onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}>
                {this.props.title}
            </button>
        );
    }
}

/**
 * “确认”按钮样式
 */
// const confirmButtonStyles: React.CSSProperties = {
//     height: 30,
//     border: "none",
//     backgroundColor: "transparent",
//     cursor: "pointer",
//     transition: "backgroud-color 0.3s",
// };
// const confirmButtonHover: React.CSSProperties = {
//     backgroundColor: "rgba(206, 197, 197, 0.5)",
// };
