import * as React from "react";
import { mix } from "../../lib";
import { AlertButton } from "./GlobalAlertButton";

// 样式
const styles: { [prop: string]: string } = require("./GlobalAlert.css");

interface Props {
    display: boolean;
    message: string;
    alertDefaultAction(): void;
    alertConfirmAction?: () => void;
    type: AlertType;
}

interface State {
    // confirmButtonHover: boolean;
    type: AlertType;
}

export enum AlertType {
    Alert,
    Confirm,
}

/**
 * 提示框后的全屏背景遮罩层样式
 */
// const backgroundStyles: React.CSSProperties = {
//     left: 0,
//     top: 0,
//     width: "100vw",
//     height: "100vh",
//     position: "fixed",
//     zIndex: 2,
//     visibility: "hidden",
//     backgroundColor: "rgba(90, 85, 85, 0.37)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
// };
// const backgroundDisplay: React.CSSProperties = {
//     visibility: "visible",
// };

/**
 * 提示框的样式
 */
// const alertStyles: React.CSSProperties = {
//     width: "30vw",
//     height: "30vh",
//     backgroundColor: "white",
//     borderRadius: 8,
//     borderColor: "rgba(206, 197, 197, 0.5)",
//     padding: 10,
//     display: "flex",
//     flexWrap: "wrap",
// };
/**
 * alert的提示消息样式
 */
// const alertMessageStyles: React.CSSProperties = {
//     width: "100%",
// };
/**
 * 提示框操作部分的样式
 */
// const alertActionStyles: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column-reverse",
//     width: "100%",
// };

export class Alert extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // confirmButtonHover: false,
            type: this.props.type,
        };

        // bind methods
        this.defaultClick = this.defaultClick.bind(this);
        this.confirmClick = this.confirmClick.bind(this);
    }

    // new lifecycle hook, replace `willReceive`
    static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
        return {
            type: nextProps.type,
            // confirmButtonHover: prevState.confirmButtonHover,
        };
    }

    private defaultClick() {
        this.props.alertDefaultAction();
    }

    private confirmClick() {
        if (this.props.alertConfirmAction) {
            this.props.alertConfirmAction();
        }
    }

    render() {
        // let backgroundS = mix(backgroundStyles);
        // if (this.props.display) {
        //     backgroundS = mix(backgroundS, backgroundDisplay);
        // }
        return (
            <div
                className={
                    this.props.display
                        ? `${styles.background} ${styles.display}`
                        : styles.background
                }>
                <div className={styles.alert}>
                    <p className={styles.message}>{this.props.message}</p>
                    <div className={styles.actions}>
                        {this.state.type == AlertType.Alert ? (
                            <AlertButton title={"好的"} onClick={this.defaultClick} />
                        ) : (
                            <div>
                                <AlertButton title={"取消"} onClick={this.defaultClick} />
                                <AlertButton title={"确定"} onClick={this.confirmClick} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
