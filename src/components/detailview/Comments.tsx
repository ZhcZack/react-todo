/**
 * 显示和修改todo备注的区域
 */

import * as React from "react"

import styles from "./Comments.module.css"

interface Props {
    initComments: string;
    onCommentsChange(value: string): void;
}

interface State {
    comments: string;
}

export class Comments extends React.Component<Props, State> {
    // /**
    //  * 新的生命周期钩子
    //  */
    // static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    //     return {
    //         comments: nextProps.initComments,
    //     };
    // }

    constructor(props: Props) {
        super(props)
        this.state = {
            comments: this.props.initComments
        }
    }

    render() {
        return (
            <textarea
                className={styles.comments}
                value={this.state.comments}
                onChange={this.handleCommentsChange}
                onBlur={this.handleCommentsOnBlur}
                placeholder="添加备注"
            />
        )
    }

    /**
     * 更新comments的值
     */
    private handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation()
        this.setState({ comments: e.target.value })
    }

    /**
     * textarea失去标点的时候更新todo的备注
     */
    private handleCommentsOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.stopPropagation()
        this.props.onCommentsChange(this.state.comments)
    }
}
