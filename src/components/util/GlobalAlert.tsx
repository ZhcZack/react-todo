/**
 * 全局提醒窗口
 *
 * 目前有两种使用场景，一个是数据初始化错误的提示，另一个是需要用户确认是否要删除列表
 */

import * as React from "react"
import { AlertButton } from "./GlobalAlertButton"

// 样式表
import styles from "./GlobalAlert.module.css"

interface Props {
    display: boolean;
    message: string;
    type: AlertType;
    alertConfirmAction?: () => void;
    alertDefaultAction(): void;
}

interface State {
    type: AlertType;
}

/**
 * 提醒的类别
 *
 * 目前只有两种类别，（默认的）提醒和（需要用户确认的）确认
 */
export enum AlertType {
    Alert,
    Confirm,
}

export class Alert extends React.Component<Props, State> {
    private myRef: React.RefObject<HTMLDivElement>
    // // new lifecycle hook, replace `willReceive`
    // static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    //     return {
    //         type: nextProps.type,
    //         // confirmButtonHover: prevState.confirmButtonHover,
    //     };
    // }

    constructor(props: Props) {
        super(props)
        this.state = {
            // confirmButtonHover: false,
            type: this.props.type
        }
        this.myRef = React.createRef()
    }

    // componentDidMount() {
    //   this.myRef.current?.focus();
    // }
    //
    // componentDidUpdate() {
    //   this.myRef.current?.focus();
    // }

    render() {
        return (
            <div
                ref={this.myRef}
                className={
                    this.props.display
                        ? `${styles.background} ${styles.display}`
                        : styles.background
                }
            >
                <div className={styles.alert}>
                    <p className={styles.message}>{this.props.message}</p>
                    <div className={styles.actions}>
                        {this.state.type === AlertType.Alert ? (
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
        )
    }

    /**
     * 点击“好的”（默认按钮）
     */
    private defaultClick = () => {
        this.props.alertDefaultAction()
    }

    /**
     * 点击“确定”（确认按钮）
     */
    private confirmClick = () => {
        if (this.props.alertConfirmAction) {
            this.props.alertConfirmAction()
        }
    }
}
