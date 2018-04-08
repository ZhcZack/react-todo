import * as React from "react"

const styles: { [propName: string]: string } = require("./DetailComments.css")

interface DetailCommentsProps {
    onCommentsChange(value: string): void
    initComments: string
}

interface DetailCommentsState {
    comments: string
}

/**
 * 备注区域的样式
 */
// const commentStyles = {
//   width: "90%",
//   height: "calc(30vh)",
//   margin: "5%",
//   padding: 10,
//   resize: "none",
//   scrollBehavior: "auto",
//   borderColor: "rgba(206, 197, 197, 0.5)",
//   outline: "none",
// }

export default class DetailComments extends React.Component<
    DetailCommentsProps,
    DetailCommentsState
> {
    constructor(props: DetailCommentsProps) {
        super(props)
        this.state = {
            comments: this.props.initComments,
        }

        // bind methods
        this.handleCommentsChange = this.handleCommentsChange.bind(this)
        this.handleCommentsOnBlur = this.handleCommentsOnBlur.bind(this)
    }

    componentWillReceiveProps(newProps: DetailCommentsProps) {
        this.setState({
            comments: newProps.initComments,
        })
    }

    /**
     * 更新comments的值
     * @param e 键盘输入事件
     */
    private handleCommentsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.stopPropagation()
        this.setState({ comments: e.target.value })
    }

    /**
     * textarea失去标点的时候更新todo的备注
     * @param e 光标移出事件
     */
    private handleCommentsOnBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
        e.stopPropagation()
        this.props.onCommentsChange(this.state.comments)
    }
    render() {
        return (
            <textarea
                // style={commentStyles}
                className={styles.comments}
                value={this.state.comments}
                onChange={this.handleCommentsChange}
                onBlur={this.handleCommentsOnBlur}
                placeholder="添加备注"
            />
        )
    }
}
